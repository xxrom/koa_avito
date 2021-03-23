const Koa = require("koa");
const logger = require("koa-morgan");
const Router = require("koa-router");
const koaBody = require("koa-body");

const server = new Koa();
const router = new Router();

const api = require("./queries");

router.get("/", (ctx, next) => {
  ctx.body = "io ---";
});

router.get("/card", async (ctx) => {
  const data = await api.getAllCards(ctx);

  console.log("data ", data);

  ctx.body = {
    status: 200,
    message: "getAllCards",
    data,
  };
});

router.get("/card/:id", async (ctx) => {
  const data = await api.getOneCard(ctx);

  console.log("data ", data);

  ctx.body = {
    status: 200,
    message: "getOneCard",
    data,
  };
});

router.post("/card", koaBody(), async (ctx) => {
  const data = await api.addOneCard(ctx);

  console.log("data", data);

  ctx.body = {
    status: 200,
    message: "addOneCard",
    data,
  };
});

router.put("/card/:id", koaBody(), async (ctx) => {
  const data = await api.updateOneCard(ctx);

  console.log("data", data);

  ctx.body = {
    status: 200,
    message: "updateOneCard",
    data,
  };
});

router.delete("/card/:id", async (ctx) => {
  const data = await api.removeOneCard(ctx);

  console.log("data ", data);

  ctx.body = {
    status: 200,
    message: "removeOneCard",
    data,
  };
});

router.post("/data", (ctx) => {
  console.log(ctx.require.body);
  ctx.body = { data: ctx.request.body };
});

server
  .use(logger("tiny"))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  })
  .listen(3010);
