const Koa = require('koa');
const logger = require('koa-morgan');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const server = new Koa();
const router = new Router();

const api = require('./queries');

// Start cache
const cache = {};
const cacheTimeout = 1000 * 60 * 15;

const setCacheByKey = (key, data = []) => {
  console.log('set cache by key', key, data.length);

  cache[key] = {
    updatedTime: Date.now(),
    data,
  };
};
const setCacheUpdatedTimeByKey = (key, updatedTime = Date.now()) => {
  cache[key].updatedTime = updatedTime;
};

const updateCacheCards = async () => {
  const currentTime = Date.now();

  const key = 'getAllCards';
  const {updatedTime = 0} = cache[key];

  const diffTime = currentTime - updatedTime;

  console.log(
    `currentTime ${currentTime}, updatedTime = ${updatedTime}, diff ${diffTime}`,
  );

  if (diffTime < cacheTimeout) {
    console.log('cacheTimeout, cache actual');

    return;
  }

  setCacheUpdatedTimeByKey(key);
  const allCards = await api.getAllCards();

  setCacheByKey(key, allCards);

  console.log('cache updated successully');
};

let currentTimeoutId = null;
let disabledTimeoutsCounter = 0;

const shouldUpdateCache = async (timeout = 5000) => {
  if (currentTimeoutId) {
    if (disabledTimeoutsCounter < 20) {
      console.log(`disable timeout ${currentTimeoutId}`);
      clearTimeout(currentTimeoutId);
      disabledTimeoutsCounter += 1;
    } else {
      disabledTimeoutsCounter = 0;
    }
  }

  currentTimeoutId = setTimeout(
    async () => {
      await updateCacheCards();
      currentTimeoutId = null;
      disabledTimeoutsCounter = 0;
      console.log(`timeout executed ${currentTimeoutId}`);
    },
    timeout,
  );
};

const initCache = () => {
  const key = 'getAllCards';

  setCacheByKey(key);
  setCacheUpdatedTimeByKey(key, 0);

  shouldUpdateCache();
};
// End cache

initCache();

// GET
router.get('/', (ctx) => {
  ctx.body = 'io --- shouldUpdateCache';

  shouldUpdateCache();
});

router.get('/card', async (ctx) => {
  // const allCards = await api.getAllCards();
  // getAllCards request takes a lot of time, so get data from cache
  const {data = null} = cache['getAllCards'];

  console.log('data from cache ', data.length);

  ctx.body = {
    status: 200,
    message: 'getAllCards',
    data,
  };
});

router.get('/card/:id', async (ctx) => {
  const data = await api.getOneCard(ctx);

  console.log('data ', data);

  ctx.body = {
    status: 200,
    message: 'getOneCard',
    data,
  };
});

// POST
router.post('/card', koaBody(), async (ctx) => {
  const data = await api.addOneCard(ctx);

  console.log('data', data);

  ctx.body = {
    status: 200,
    message: 'addOneCard',
    data,
  };
  shouldUpdateCache();
});

// POST
router.put('/card/:id', koaBody(), async (ctx) => {
  const data = await api.updateOneCard(ctx);

  console.log('data', data);

  ctx.body = {
    status: 200,
    message: 'updateOneCard',
    data,
  };
  shouldUpdateCache();
});

// DELETE
router.delete('/card/:id', async (ctx) => {
  const data = await api.removeOneCard(ctx);

  console.log('data ', data);

  ctx.body = {
    status: 200,
    message: 'removeOneCard',
    data,
  };
  shouldUpdateCache();
});

server
  .use(logger('tiny'))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  })
  .listen(3010);
