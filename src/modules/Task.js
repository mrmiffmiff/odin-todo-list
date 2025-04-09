export default class Task {
    #complete = false; // Starts off incomplete always; can only switch through provided function
    #priority; // User shouldn't be able to directly set this except through provided setter, thus it's private

    constructor(name, description = '', priority = 4) {
        this.name = name;
        this.description = description;
        this.#priority = priority;
    }

    get completionStatus() {
        return this.#complete;
    }

    get priority() {
        return this.#priority;
    }

    set priority(level) { // Some of this might be irrelevant in practice through browser usage but I still want it covered
        if (typeof (level) != "number") {
            throw new TypeError("Priority level should be a number");
        }
        if (level < 1 || level > 4) {
            throw new RangeError("Priority level should be between 1 and 4");
        }
        this.#priority = level;
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