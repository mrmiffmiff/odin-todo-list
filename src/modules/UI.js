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
        li.innerHTML = `
            <span class="project-name">${name}</span>
            <span class="project-buttons">
                <button class="edit-btn" title="Edit project">E</button>
                <button class="delete-btn" title="Delete project">&#10006;</button>
            </span>
        `;
        li.className = "project-link";
        li.dataset.project = name;
        projectList.appendChild(li);

        li.querySelector(".edit-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            showEditProjectModal(name);
        });

        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            // showDeleteProjectModal(name);
        });
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

function showEditProjectModal(projectName) {
    const project = UserFunctions.getProject(projectName);
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    modal.innerHTML = `
    <h3>Edit Project</h3>
    <label for="edit-title">Title:</label><br>
    <input type="text" id="edit-title" value="${UserFunctions.getProjectName(project)}">
    <br>
    <label for="edit-desc">Description:</label><br>
        <textarea id="edit-desc">${UserFunctions.getProjectDescription(project) || ""}</textarea>
    <div class="modal-actions">
        <button id="save-edit">Save</button>
        <button id="cancel-edit">Cancel</button>
    </div>
    `;
    overlay.style.display = "flex";

    document.getElementById("save-edit").addEventListener("click", () => {
        const activeProjectEl = document.querySelector(".active");
        const activeProject = (activeProjectEl.dataset.project || "Inbox");
        const newTitle = document.getElementById("edit-title").value.trim();
        const newDesc = document.getElementById("edit-desc").value;
        // edit description first prior to changing title
        UserFunctions.editProjectDescription(project, newDesc)
        if (newTitle && newTitle != UserFunctions.getProjectName(project)) {
            if (UserFunctions.getProject(newTitle)) {
                alert("Can't duplicate project names! Leaving existing title!")
            }
            else {
                UserFunctions.editProjectName(project, newTitle);
            }
        }
        overlay.style.display = "none";
        renderProjects();
        const actualActiveProject = (UserFunctions.getProject(activeProject) || newTitle);
        document.querySelectorAll(".project-link").forEach(link => {
            if ((link.dataset.project || "Inbox") === UserFunctions.getProjectName(actualActiveProject)) {
                link.classList.add("active");
            }
        });
        renderProjectContent(UserFunctions.getProjectName(actualActiveProject));
    });
    document.getElementById("cancel-edit").addEventListener("click", () => {
        overlay.style.display = "none";
        modal.innerHTML = ``;
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