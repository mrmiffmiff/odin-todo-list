import UserFunctions from "./UserFunctions";

function renderProjects() {
    const projectList = document.getElementById("project-list");
    // Remove all except Inbox and divider
    projectList.innerHTML = `
        <li id="inbox-link" class="project-link">Inbox</li>
        <hr class="sidebar-divider">
    `;

    // Add custom projects
    const projects = UserFunctions.listProjects();
    projects.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        li.className = "project-link";
        li.dataset.project = name;
        projectList.appendChild(li);
    });

    // Add click listeners
    projectList.querySelectorAll(".project-link").forEach(link => {
        link.addEventListener("click", () => {
            // Remove active from all
            projectList.querySelectorAll(".project-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            renderProjectContent(link.dataset.project || "Inbox");
        });
    });
}

function renderProjectContent(projectName) {
    const project = UserFunctions.getProject(projectName);
    const main = document.querySelector(".main-content");
    const title = main.querySelector("h2");
    const taskList = main.querySelector(".task-list");
    // Set the title
    title.textContent = UserFunctions.getProjectName(project);
    title.classList.remove("before-description");
    // Possibly remove and possibly set the description
    const currDesc = document.querySelector(".project-description");
    if (currDesc) currDesc.remove();
    if (UserFunctions.getProjectDescription(project) != '') {
        const newDesc = document.createElement("p");
        newDesc.classList.add("project-description");
        newDesc.textContent = UserFunctions.getProjectDescription(project);
        main.insertBefore(newDesc, taskList);
        title.classList.add("before-description");
    }
}

export default function initialRender() {
    renderProjects();
    document.getElementById("inbox-link").classList.add("active"); // Want to start with inbox of course
    renderProjectContent("Inbox");
}