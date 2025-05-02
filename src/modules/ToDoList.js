import Project from "./Project";

export default class ToDoList {
    constructor() {
        this.inbox = new Project("Inbox", "");
        this.customProjects = [];
    }

    getInbox() {
        return this.inbox;
    }

    getProjects() {
        return this.customProjects;
    }

    getProject(name) {
        return this.customProjects.find((project) => project.name === name);
    }

    hasProject(name) {
        return this.customProjects.some((project) => project.name === name);
    }

    addProject(project) {
        // First check for duplicate names (not allowed)
        if (this.hasProject(project.name)) {
            console.log("Can't duplicate project names!")
            return;
        }
        this.customProjects.push(project);
    }

    deleteProject(project) { // For users there may be a wrapper that uses name, but for now...
        const index = this.customProjects.indexOf(project);
        this.customProjects.splice(index, 1);
    }
}