import "modern-normalize/modern-normalize.css";
import "./styles.css";
import Task from "./modules/Task";
import Project from "./modules/Project";
import ToDoList from "./modules/ToDoList";

window.Task = Task;
window.Project = Project;
window.ToDoList = ToDoList;
let testInboxTask1 = new Task('uwu', 'owo', 3, new Date(2026, 3, 5));
let testInboxTask2 = new Task('umu', 'omo', 2, new Date(2026, 3, 6));
let testInboxTask3 = new Task('uku', 'oko', 1, new Date(2026, 3, 7));
let testCustomTask1 = new Task('uyu', 'oyo', 2, new Date(2026, 3, 5));
let testCustomTask2 = new Task('uyu', 'oyo', 3, new Date(2026, 3, 6));
let testProject1 = new Project('usu', 'oso');
let testProject2 = new Project('unu', 'ono');
testProject1.addTask(testCustomTask1);
testProject1.addTask(testCustomTask2);
let testList = new ToDoList();
testList.inbox.addTask(testInboxTask1);
testList.inbox.addTask(testInboxTask2);
testList.inbox.addTask(testInboxTask3);
testList.addProject(testProject1);
testList.addProject(testProject2);
window.testList = testList;

// Based on the Pipe approach from Eric Elliot's Composing Software and Davide de Paolis's take on it for revivers (backported to JS from TS)
const ReviverPipe = (...revivers) => (key, value) => revivers.reduce((v, currentReviver) => currentReviver(key, v), value);
const finalReviver = ReviverPipe(Project.Reviver, ToDoList.Reviver);
window.reviver = finalReviver;