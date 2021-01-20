"use strict";

const fs = require("fs");

const rawdata = fs.readFileSync("todos.json");
const todos = JSON.parse(rawdata);

const usage = `Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`;

if (typeof process.argv[2] != "undefined") {
  switch (process.argv[2]) {
    case "add":
      if (typeof process.argv[3] != "undefined") {
        try {
          todos.Pending.push(process.argv[3]);
          const json = JSON.stringify(todos);
          fs.writeFileSync("todos.json", json, "utf8");
          console.log(
            `Added todo: ` +
              `\"` +
              todos.Pending[todos.Pending.length - 1] +
              `\"`
          );
        } catch (error) {}
      } else {
        console.log(`Error: Missing todo string. Nothing added!`);
      }
      break;
    case "ls":
      todos.Pending.reverse();
      const length = todos.Pending.length;
      if (length != 0) {
        todos.Pending.forEach((todo, index) => {
          console.log(`[` + (length - index) + `] ` + todo);
        });
      } else {
        console.log("There are no pending todos!");
      }
      break;
    case "del":
      if (typeof process.argv[3] != "undefined") {
        try {
          const number = process.argv[3];
          if (number > 0 && number < todos.Pending.length + 1) {
            todos.Pending.splice(number - 1, 1);
            const json = JSON.stringify(todos);
            fs.writeFileSync("todos.json", json, "utf8");
            console.log(`Deleted todo #${number}`);
          } else {
            console.log(
              `Error: todo #${number} does not exist. Nothing deleted.`
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(`Error: Missing NUMBER for deleting todo.`);
      }
      break;
    case "done":
      if (typeof process.argv[3] != "undefined") {
        try {
          const number = process.argv[3];
          if (number > 0 && number < todos.Pending.length + 1) {
            todos.Completed.push(todos.Pending[number - 1]);
            todos.Pending.splice(number - 1, 1);
            const json = JSON.stringify(todos);
            fs.writeFileSync("todos.json", json, "utf8");
            console.log(`Marked todo #${number} as done.`);
          } else {
            console.log(`Error: todo #${number} does not exist.`);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(`Error: Missing NUMBER for marking todo as done.`);
      }
      break;
    case "help":
      console.log(usage);
      break;
    case "report":
      const date = new Date();
      console.log(
        `${date.toISOString().slice(0, 10)} Pending : ${
          todos.Pending.length
        } Completed : ${todos.Completed.length}`
      );
      break;
    default:
      console.log(usage);
      break;
  }
} else {
  console.log(usage);
}
