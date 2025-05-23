import Reviver from "./Reviver";
import ToDoList from "./ToDoList";

const LOCAL_STORAGE_KEY = "userList";

// Given a ToDoList, save to local storage
export function saveList(list) {
    // We'll use try-catch here because with this sort of thing we can't be too careful
    try {
        const stringList = JSON.stringify(list);
        localStorage.setItem(LOCAL_STORAGE_KEY, stringList);
    } catch (error) {
        console.error("Failed to save ToDoList", error);
    }
}

// And for loading...
export function loadList() {
    try {
        const stringList = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stringList) {
            return new ToDoList();
        }
        let desList = ToDoList.fromJSON(JSON.parse(stringList, Reviver));
        return desList;
    } catch (error) {
        console.error("Failed to load, creating new ToDoList", error);
        return new ToDoList();
    }
}