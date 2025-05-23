import "modern-normalize/modern-normalize.css";
import "./styles.css";
import UserFunctions from "./modules/UserFunctions";
import Project from "./modules/Project";
import UI from "./modules/UI";

window.Project = Project;
window.UserFunctions = UserFunctions;

document.addEventListener("DOMContentLoaded", () => {
    UI();
});