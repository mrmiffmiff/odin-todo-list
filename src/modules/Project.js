import Task from "./Task";

export default class Project {
    #tasks = [];

    constructor(name, description = '') {
        this.name = name;
        this.description = description;
    }

    // This might be a stopgap while I'm still in console mode; might need to directly return the array at some point?
    // That'd go against the point of making it private, though, since arrays are passed by a copy of the reference...
    // Then again, none of this should be user-facing, so maybe it doesn't even need to be private anyway... we'll see
    listTasks() {
        for (const task of this.#tasks) {
            console.log(`${task.name} is ${task.description}, priority ${task.priority}, due ${task.dueDate}`);
        }
    }

    addTask(TaskToAdd) {
        if (this.hasTask(TaskToAdd.name)) {
            console.log("Can't duplicate Task names in any one project!");
            return;
        }
        try { this.#tasks.push(TaskToAdd); } catch (e) {
            throw new Error("Somehow, adding a new Task failed.", { cause: e });
        }
        this.sortTasks();
    }

    getTasks() {
        return this.#tasks;
    }

    getTask(name) {
        return this.#tasks.find((task) => task.name === name);
    }

    hasTask(name) {
        return this.#tasks.some((task) => task.name === name);
    }

    deleteTask(task) {
        const index = this.#tasks.indexOf(task);
        this.#tasks.splice(index, 1);
    }

    sortTasks() {
        this.#tasks.sort(Task.Compare);
    }

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    // Because I use private instances, I have to make my own serialization method for stringifying
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            _tasks: this.#tasks,
        }
    }

    static Reviver(key, value) {
        if (key === '_tasks') {
            return value.map((task) => Task.fromJSON(task));
        }
        return value;
    }

    static fromJSON(json) {
        const desProject = new Project(json.name, json.description);
        for (const task of json._tasks) desProject.addTask(task);
        return desProject;
    }
}