import Project from "./Project";
import ToDoList from "./ToDoList";

// Based on the Pipe approach from Eric Elliot's Composing Software and Davide de Paolis's take on it for revivers (backported to JS from TS)
const ReviverPipe = (...revivers) => (key, value) => revivers.reduce((v, currentReviver) => currentReviver(key, v), value);
const finalReviver = ReviverPipe(Project.Reviver, ToDoList.Reviver);
export default finalReviver;