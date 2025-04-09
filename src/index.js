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