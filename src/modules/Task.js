import { format, isDate, compareAsc } from "date-fns";

/* I wavered between throwing errors and just defaulting behavior.
 * Eventually, I realized that since this isn't user-facing and I control what users can do with it,
 * I should err on the side of throwing. */
export default class Task {
    #complete = false; // Starts off incomplete always; can only switch through provided function
    #priority; // User shouldn't be able to directly set this except through provided setter, thus it's private
    #dueDate;

    constructor(name, description = '', level = 4, date = new Date()) {
        this.name = name;
        this.description = description;
        if (typeof (level) != "number") {
            throw new TypeError("Priority level should be a number");
        }
        if (level < 1 || level > 4) {
            throw new RangeError("Priority level should be between 1 and 4");
        }
        this.#priority = level;
        if (!isDate(date)) {
            throw new TypeError("Date is not a date, how strange.");
        }
        this.#dueDate = date;
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

    get dueDate() {
        return format(this.#dueDate, 'PPP');
    }

    set dueDate(date) {
        if (!isDate(date)) throw new TypeError("Date is not a date, how strange.");
        this.#dueDate = date;
    }

    switchComplete() {
        if (this.#complete) {
            this.#complete = false;
        }
        else {
            this.#complete = true;
        }
    }

    // Things related to tasks themselves are the responsibility of the Task class; I almost put this in Project until I decided that wasn't right
    static Compare(task1, task2) {
        if (task1.priority < task2.priority) return -1;
        else if (task1.priority > task2.priority) return 1;
        else return compareAsc(task1.dueDate, task2.dueDate);
    }

    // Because I use private instances, I have to make my own serialization method for stringifying
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            _complete: this.#complete,
            _priority: this.#priority,
            _dueDate: this.#dueDate,
        }
    }

    static fromJSON(json) {
        const desTask = new Task(json.name, json.description, json._priority, new Date(json._dueDate));
        if (json._complete) desTask.switchComplete();
        return desTask;
    }

}