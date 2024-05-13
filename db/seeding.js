const fs = require("fs");
const pool = require("./connection");

let users = fs.readFileSync("./data/users.json", "utf-8");
users = JSON.parse(users)
  .map((el) => {
    return `('${el.firstName}', '${el.lastName}', '${el.email}', '${el.gender}')`;
  })
  .join(",\n");

let tasks = fs.readFileSync("./data/tasks.json", "utf-8");
tasks = JSON.parse(tasks)
  .map((el) => {
    return `('${el.UserId}', '${el.title}', '${el.status}', '${el.deadline}', '${el.priority}')`;
  })
  .join(",\n");

const userQuery = `
  INSERT INTO "Users" ("firstName", "lastName", "email", "gender")
  VALUES
    ${users}
  RETURNING *
`;

const taskQuery = `
  INSERT INTO "Tasks" ("UserId", "title", "status", "deadline", "priority")
  VALUES
    ${tasks}
  RETURNING *
`;

(async () => {
  try {
    const { rows: users } = await pool.query(userQuery);
    console.log(`Success insert data Users`);
    // console.table(users);
    const { rows: tasks } = await pool.query(taskQuery);
    console.log(`Success insert data Tasks`);
    // console.table(tasks);
  } catch (error) {
    console.log(error.message);
  }
})();
