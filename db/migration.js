const pool = require("./connection");

const userDDL = `
  CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "gender" CHAR(1) NOT NULL
  )
`;

const taskDDL = `
  CREATE TABLE IF NOT EXISTS "Tasks" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT FALSE,
    "deadline" DATE NULL,
    "priority" CHAR(1) NOT NULL DEFAULT 'L',
    "UserId" INT NOT NULL REFERENCES "Users" ("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE
  )
`;

(async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS "Tasks", "Users"`);
    console.log(`Success drop table Users & Tasks`);
    await pool.query(userDDL);
    console.log(`Success create table Users`);
    await pool.query(taskDDL);
    console.log(`Success create table Tasks`);
  } catch (error) {
    console.log(error.message);
  }
})();
