// This is the file where I load the To Do list in memory and execute any user functionality upon it and its contents
// Said functionality is exposed to the UI of course

import Task from "./Task";
import Project from "./Project";
import ToDoList from "./ToDoList";
import Storage from "./Storage";

// Load in the toDoList
const userList = Storage.loadList();

// Wrapper to persist the list, to be called after any action that changes it
function persist() {
    Storage.saveList(userList);
}

export default class UserFunctions {
    // Return the to do list object; possibly unnecessary
    static getToDoList() {
        return userList;
    }

    // Project Functions
    static listProjects() {
        return userList.getProjects().map((project) => project.name);
    }

    static createProject(project) {
        userList.addProject(project);
        persist();
    }

    static deleteProject(name) {
        userList.deleteProject(userList.getProject(name));
        persist();
    }

    static editProjectName(oldName, newName) {
        if (userList.hasProject(newName)) {
            console.log("Can't duplicate project names!")
            return;
        }
        userList.getProject(oldName).setName(newName);
        persist();
    }

    static editProjectDescription(name, description) {
        userList.getProject(name).setDescription(description);
        persist();
    }

    // Task functions
    static listTasks(projectName = undefined) {
        if (projectName) {
            return userList.getProject(projectName).getTasks().map((task) => task.name);
        }
        return userList.getInbox().getTasks().map((task) => task.name);
    }

    // I'm realizing that much of what I'm doing here isn't precisely SOLID... maybe I should move on to doing some of the UI...
}