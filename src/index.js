const Koa = require("koa");
const logger = require("koa-morgan");
const Router = require("koa-router");
const bodyParser = require("koa-body")();

const server = new Koa();
const router = new Router();

const db = require("./queries");

router.get("/", (ctx, next) => {
  ctx.body = "io ---";
});

router.get("/cards", async (ctx) => {
  const data = await db.getCards(ctx);

  console.log("data ", data);

  ctx.body = {
    status: 200,
    message: "get all cards",
    data: data,
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
