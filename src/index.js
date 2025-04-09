import "modern-normalize/modern-normalize.css";
import "./styles.css";
import Task from "./modules/Task";

let testTask = new Task("Test Task", "oh what a great task this is");
console.log(`${testTask.name} has description: ${testTask.description}`);
console.log(testTask.completionStatus);
testTask.switchComplete();
console.log(testTask.completionStatus);
testTask.switchComplete();
console.log(testTask.completionStatus);
console.log(`Priority: ${testTask.priority}`);
testTask.priority = 3;
console.log(`Priority: ${testTask.priority}`);
try { testTask.priority = 0; } catch (e) { console.log(e.message); }
try { testTask.priority = "hello"; } catch (e) { console.log(e.message); }
let secondTask = new Task("Second Task", "we're on a roll", 2, new Date(2027, 0, 1));
console.log(`Second Task Priority: ${secondTask.priority}`);
console.log(testTask.dueDate);
console.log(secondTask.dueDate);
testTask.dueDate = "uwu owo";
testTask.dueDate = new Date(2026, 1, 5);
console.log(testTask.dueDate);
let badPriority = new Task("Bad Priority", '', 0);
console.log(`Bad Priority Task Priority: ${badPriority.priority}`);