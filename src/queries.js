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

export const getCards = async (ctx) => {
  console.log("get cards");

  const data = await pool.query("select * from videocards;")

  return data.rows[0];
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

*/
