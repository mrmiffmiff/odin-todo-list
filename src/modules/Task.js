import { format, isDate } from "date-fns";
export default class Task {
    #complete = false; // Starts off incomplete always; can only switch through provided function
    #priority; // User shouldn't be able to directly set this except through provided setter, thus it's private
    #dueDate;

    constructor(name, description = '', priority = 4, date = new Date()) {
        this.name = name;
        this.description = description;
        this.#priority = priority;
        if (!isDate(date)) {
            console.log("Improperly formatted date, setting to today");
            this.#dueDate = new Date();
        }
        else this.#dueDate = date;
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
        if (!isDate(date)) console.log("Improperly formatted date, not changing date");
        else this.#dueDate = date;
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