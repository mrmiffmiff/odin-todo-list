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
        link.onclick = () => {
            // Remove active from all
            projectList.querySelectorAll(".project-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            renderProjectContent(link.dataset.project || "Inbox");
        };
    });
}

function renderProjectContent(projectName) {
    // Set the title
    document.querySelector(".main-content h2").textContent = projectName;

}

export default function initialRender() {
    renderProjects();
    renderProjectContent("Inbox");
}