export default class Task {
    #complete = false;

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    get completionStatus() {
        return this.#complete;
    }

    switchComplete() {
        if (this.#complete) {
            this.#complete = false;
        }
        else {
            this.#complete = true;
        }
    }

}