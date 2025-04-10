import Task from "./Task";

export default class Project {
    #tasks = [];

    constructor(name, description) {
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

    addTask(name, description = undefined, priorityLevel = undefined, date = undefined) {
        try { this.#tasks.push(new Task(name, description, priorityLevel, date)); } catch (e) {
            throw new Error("Somehow, adding a new Task failed.", { cause: e });
        }
    }

    sortTasks() {
        this.#tasks.sort(Task.Compare);
    }
}