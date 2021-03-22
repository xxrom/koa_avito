// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
const { Pool, Client } = require("pg");

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

export const getAllCards = async (ctx) => {
  try {
    console.log("getAllCards");

    const data = await pool.query("select * from videocards;");

    return data.rows;
  } catch (e) {
    console.error("ERROR: getAllCards/", e);
  }
};
export const getOneCards = async (ctx) => {
  try {
    console.log('ctx', ctx.params)
    const id = ctx.params.id;

    console.log(`getOneCards ${id}`);

    const data = await pool.query(
      `select * from videocards where card_id = ${id};`
    );

    return data.rows[0];
  } catch (e) {
    console.error("ERROR: getOneCard/", e);
  }
};

export const addOneCards = async (ctx) => {
  try {
    console.log('ctx', ctx.params)
    console.log('ctx', ctx.request.body)
    const { card_id, link, title, price, timeAgo, geo } = ctx.request.body;

    const createdTime = Date.now();

    console.log(`addOneCard ${card_id}`);

    const data = await pool.query(
      `insert into videocards values (DEFAULT, ${card_id}, '${link}', '${title}', '${price}', '${timeAgo}', '${geo}', ${createdTime});`);

    return data.rows;
  } catch (e) {
    console.error("ERROR: getOneCard/", e);

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
/card/:id   delete  * delete card

*/
