import "modern-normalize/modern-normalize.css";
import "./styles.css";
import Task from "./modules/Task";
import Project from "./modules/Project";
import ToDoList from "./modules/ToDoList";

window.Task = Task;
window.Project = Project;
window.ToDoList = ToDoList;
let testTask = new Task('uwu', 'owo', 3, new Date(2026, 3, 5));
window.testTask = testTask;
let testProject = new Project('omo', 'oko');
testProject.addTask(testTask);
window.testProject = testProject;
// Based on the Pipe approach from Eric Elliot's Composing Software and Davide de Paolis's take on it for revivers (backported to JS from TS)
const ReviverPipe = (...revivers) => (key, value) => revivers.reduce((v, currentReviver) => currentReviver(key, v), value);
const finalReviver = ReviverPipe(Project.Reviver);
window.reviver = finalReviver;