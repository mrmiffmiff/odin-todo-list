import "modern-normalize/modern-normalize.css";
import "./styles.css";
import Project from "./modules/Project";

let testProject = new Project('test', 'happy');
testProject.addTask('test task', 'owo', 3);
testProject.addTask('test task 2', undefined, 2, new Date(2026, 6, 25));
testProject.addTask('test task 3', 'okami', 4, new Date(2024, 1, 10));
testProject.addTask('test task 4', 'high priority', 1, new Date(2029, 1, 1))
testProject.listTasks();
console.log("Sorting...");
testProject.sortTasks();
testProject.listTasks();