import "modern-normalize/modern-normalize.css";
import "./styles.css";
import Task from "./modules/Task";

let testTask = new Task("Test Task", "oh what a great task this is");
let secondTask = new Task("Second Task", "we're on a roll", 2, new Date(2027, 0, 1));
console.log(testTask.dueDate);
console.log(secondTask.dueDate);
try { testTask.dueDate = "uwu owo"; } catch (e) { console.log(`Obviously we can't set the date to a non-date: ${e.message}`); }
testTask.dueDate = new Date(2026, 1, 5);
console.log(testTask.dueDate);
try { new Task("Bad Date", undefined, undefined, "this is not a date"); }
catch (e) { console.log(`Obviously we can't set the date to a non-date: ${e.message}`); }