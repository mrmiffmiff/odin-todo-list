import UserFunctions from "./UserFunctions";

function renderProjects() {
    const projectList = document.getElementById("project-list");
    // Remove all except Inbox and divider
    projectList.innerHTML = `
        <li id="inbox-link" class="project-link">Inbox</li>
        <li>
            <button id="add-project-btn" class="add-project-btn">+ Add Project</btn>
        </li>
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
            showDeleteProjectModal(name);
        });
    });

    // Add listener for create button
    document.getElementById("add-project-btn").addEventListener("click", () => {
        showAddProjectModal();
    })

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

function showAddProjectModal() {
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    modal.innerHTML = `
    <h3>Add Project</h3>
    <label for="new-title">Title:</label><br>
    <input type="text" id="new-title">
    <br>
    <label for="new-desc">Description:</label><br>
        <textarea id="new-desc"></textarea>
    <div class="modal-actions">
        <button id="save-new">Save</button>
        <button id="cancel-new">Cancel</button>
    </div>
    `;
    overlay.style.display = "flex";

    document.getElementById("save-new").addEventListener("click", () => {
        const activeProjectEl = document.querySelector(".active");
        const activeProject = (activeProjectEl.dataset.project || "Inbox");
        const name = document.getElementById("new-title").value.trim();
        const desc = document.getElementById("new-desc").value;
        if (!name) {
            alert("Project name cannot be empty!");
            return;
        }
        if (UserFunctions.getProject(name)) {
            alert("Can't duplicate project names!");
            return;
        }
        UserFunctions.createProject(name, desc);
        overlay.style.display = "none";
        modal.innerHTML = ``;
        renderProjects();
        document.querySelectorAll(".project-link").forEach(link => {
            if ((link.dataset.project || "Inbox") === activeProject) {
                link.classList.add("active");
            }
        });
        renderProjectContent(activeProject);
    });

    document.getElementById("cancel-new").addEventListener("click", () => {
        overlay.style.display = "none";
        modal.innerHTML = ``;
    })
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
        if (!newTitle) {
            alert("Project name cannot be empty!");
            return;
        }
        else if (newTitle != UserFunctions.getProjectName(project)) {
            if (UserFunctions.getProject(newTitle)) {
                alert("Can't duplicate project names!");
                return;
            }
            else {
                UserFunctions.editProjectName(project, newTitle);
            }
        }
        UserFunctions.editProjectDescription(project, newDesc);
        overlay.style.display = "none";
        modal.innerHTML = ``;
        renderProjects();
        const actualActiveProject = (UserFunctions.getProject(activeProject) || UserFunctions.getProject(newTitle));
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

function showDeleteProjectModal(projectName) {
    const project = UserFunctions.getProject(projectName);
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    modal.innerHTML = `
    <h3>Delete Project</h3>
    <h4>${UserFunctions.getProjectName(project)}</h4>
    <p>Are you sure you want to delete this project?</p>
    <div class="modal-actions">
        <button id="save-delete">Confirm</button>
        <button id="cancel-delete">Cancel</button>
    </div>
    `
    overlay.style.display = "flex";

    document.getElementById('save-delete').addEventListener("click", () => {
        const activeProjectEl = document.querySelector(".active");
        const activeProject = (activeProjectEl.dataset.project || "Inbox");
        UserFunctions.deleteProject(project);
        overlay.style.display = "none";
        modal.innerHTML = ``;
        renderProjects();
        // If the active project was the one deleted, default to Inbox
        const actualActiveProject = (UserFunctions.getProject(activeProject) || UserFunctions.getProject("Inbox"));
        document.querySelectorAll(".project-link").forEach(link => {
            if ((link.dataset.project || "Inbox") === UserFunctions.getProjectName(actualActiveProject)) {
                link.classList.add("active");
            }
        });
        renderProjectContent(UserFunctions.getProjectName(actualActiveProject));
    });

    document.getElementById('cancel-delete').addEventListener("click", () => {
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