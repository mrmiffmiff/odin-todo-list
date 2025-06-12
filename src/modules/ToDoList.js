import Project from "./Project";

export default class ToDoList {
    showCompletedTasks = true;

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

    toggleShowCompletedTasks() {
        if (this.showCompletedTasks)
            this.showCompletedTasks = false;
        else this.showCompletedTasks = true;
    }

    // I don't need a toJSON method here, since I'm not using private instances
    // I do need a reviver, though, to make sure Project's fromJSON method is used
    static Reviver(key, value) {
        if (key === 'customProjects') {
            return value.map((project) => Project.fromJSON(project));
        }
        if (key === 'inbox') {
            return Project.fromJSON(value);
        }
        // If it's not a project, just return the value
        // This is a bit redundant, but it makes it clear that this is the default case and accounts for potential model changes
        return value;
    }

    // I do need a fromJSON to make sure that when we deserialize it's actually an instance of this class. But since these instances aren't private
    // I can just set them directly.
    static fromJSON(json) {
        const desList = new ToDoList();
        if (Object.getOwnPropertyNames(json).includes("showCompletedTasks"))
            desList.showCompletedTasks = json.showCompletedTasks;
        if (Object.getOwnPropertyNames(json).includes("inbox"))
            desList.inbox = json.inbox;
        if (Object.getOwnPropertyNames(json).includes("customProjects"))
            desList.customProjects = json.customProjects;
        return desList;
    }
}