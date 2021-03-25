// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
const {Pool, Client} = require("pg");

const client = new Client({
  user: "postgres",
  host: "192.168.1.61",
  database: "avito",
  password: "123456",
  port: 5433,
});
client.connect();

const pool = new Pool({
  user: "postgres",
  host: "192.168.1.61",
  database: "avito",
  password: "123456",
  port: 5433,
});

export const getAllCards = async () => {
  try {
    console.log("getAllCards");

    const data = await pool.query("select * from videocards;");

    return data.rows;
  } catch (e) {
    console.error("ERROR: getAllCards/", e);
  }
};

export const getOneCard = async (ctx) => {
  try {
    console.log('ctx', ctx.params)
    const id = ctx.params.id;

    console.log(`getOneCard ${id}`);

    const data = await pool.query(
      `select * from videocards where card_id = ${id};`
    );

    return data.rows[0];
  } catch (e) {
    console.error("ERROR: getOneCard/", e);
  }
};

export const addOneCard = async (ctx) => {
  try {
    console.log('ctx', ctx.params)
    console.log('ctx', ctx.request.body)
    const {card_id, link, title, price, timeAgo, geo} = ctx.request.body;

    const createdTime = Date.now();

    console.log(`addOneCard ${card_id}`);

    const data = await pool.query(
      `insert into videocards values (DEFAULT, ${card_id}, '${link}', '${title}', '${price}', '${timeAgo}', '${geo}', ${createdTime});`);

    return data.rows;
  } catch (e) {
    console.error("ERROR: addOneCard/", e);

    return e.message;
  }
};
export const updateOneCard = async (ctx) => {
  try {
    console.log('ctx', ctx.params)
    const id = ctx.params.id;

    console.log('ctx', ctx.request.body)
    const {link, title, price, timeAgo, geo} = ctx.request.body;

    const createdTime = Date.now();

    console.log(`updateOneCard ${id}`);

    const data = await pool.query(
      `UPDATE videocards SET link = '${link}', title = '${title}', price = '${price}', timeAgo = '${timeAgo}', geo = '${geo}', createdTime = ${createdTime} WHERE card_id = ${id};`);

    return data.rows;
  } catch (e) {
    console.error("ERROR: updateOneCard/", e);

    return e.message;
  }
};

export const removeOneCard = async (ctx) => {
  try {
    console.log('ctx', ctx.params)
    const id = ctx.params.id;

    console.log(`removeOneCard ${id}`);

    const data = await pool.query(`DELETE FROM videocards WHERE card_id = ${id}`);

    return data.rows;
  } catch (e) {
    console.error("ERROR: removeOneCard/", e);

    return e.message;
  }
};

/*

create table videocards {
 id serial PRIMARY KEY,
 card_id int4,
 link text,
 title text,
 price int4,
 timeAgo text,
 geo text,
 createdTime int8
}

+ /card       get     get get all cards
+ /card/:id   get     get one card
+ /card       post    add one card
/card/:id   put     update card
+ /card/:id   delete  * delete card

ADD
curl -d '{"card_id": "2131858292", "link": "/moskovskaya_oblast_ivanteevka/tovary_dlya_kompyutera/videokarta_4_gb_geforce_gtx_980_asus_strix_oc_2131858292?slocation=107620", "title": "Видеокарта 4 gb geforce gtx 980 asus strix OC", "price": "20000", "timeAgo": "20 hours ago", "geo": "ivanteevka" }' -H "Content-Type: application/json" -X POST http://localhost:3010/card

UPDATE
curl -d '{"link": "/moskovskaya_oblast_ivanteevka/tovary_dlya_kompyutera/videokarta_4_gb_geforce_gtx_980_asus_strix_oc_2131858292?slocation=107620", "title": "Видеокарта 4 gb geforce gtx 980 asus strix OC", "price": "20000", "timeAgo": "20 hours ago", "geo": "ivanteevka222" }' -H "Content-Type: application/json" -X PUT http://localhost:3010/card/2108953106

REMOVE
curl -X DELETE http://localhost:3010/card/2131858292
{"status":200,"message":"removeOneCard","data":[]}

*/
