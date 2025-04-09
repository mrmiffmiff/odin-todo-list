import { format, isDate } from "date-fns";

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

}