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
        const projectItem = document.createElement("li");
        projectItem.innerHTML = `
            <span class="project-name">${name}</span>
            <span class="project-buttons">
                <button class="edit-btn" title="Edit project">E</button>
                <button class="delete-btn" title="Delete project">&#10006;</button>
            </span>
        `;
        projectItem.className = "project-link";
        projectItem.dataset.project = name;
        projectList.appendChild(projectItem);

        projectItem.querySelector(".edit-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            showEditProjectModal(name);
        });

        projectItem.querySelector(".delete-btn").addEventListener("click", (e) => {
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
    const projectHeader = main.querySelector(".project-header");
    const title = projectHeader.querySelector("h2");
    const taskList = main.querySelector(".task-list");
    //Empty tasklist after transition
    taskList.innerHTML = ``;

    // Set the title
    title.textContent = UserFunctions.getProjectName(project);
    title.classList.remove("before-description");

    // Add a button to the header; remove old if present
    const oldButton = projectHeader.querySelector(".add-task-btn");
    if (oldButton) oldButton.remove();
    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-task-btn");
    addTaskBtn.title = "Add Task";
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.addEventListener("click", () => {
        showAddTaskModal(project);
    });
    projectHeader.appendChild(addTaskBtn);

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

    const tasks = UserFunctions.getTasks(project).filter(task => UserFunctions.getShowCompletedTasks() || !task.completionStatus);
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.dataset.task = task.name;
        taskItem.innerHTML = `
        <input type="checkbox" class = "task-checkbox priority-${task.priority}" ${task.completionStatus ? "checked" : ""}>
        <span class = "task-name">${task.name}</span>
        <span class = "task-due-date">${task.dueDate}</span>
        <button class="delete-task-btn" title="Delete Task">&#10006;</button>
        `;

        // Logic to switch completion
        const checkbox = taskItem.querySelector(".task-checkbox");
        checkbox.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        checkbox.addEventListener("change", () => {
            UserFunctions.toggleCompletion(task);
            renderProjectContent(project.name);
        });

        const deleteBtn = taskItem.querySelector(".delete-task-btn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showDeleteTaskModal(project, task);
        });

        taskItem.addEventListener("click", () => {
            showEditTaskModal(project, task);
        });

        taskList.appendChild(taskItem);
    });

}

function showAddTaskModal(project) {
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    modal.innerHTML =
        `
    <h3>Add Task</h3>
    <label for="add-task-name">Title:</label>
    <input type="text" id="add-task-name">
    <br>
    <label for="add-task-desc">Description:</label><br>
    <textarea id="add-task-desc"></textarea>
    <br>
    <label for="add-task-priority">Priority:</label>
    <input type="number" id="add-task-priority" max="4" min="1" value="4">
    <br>
    <label for="add-task-date">Due Date:</label>
    <input type="date" id="add-task-date">
    <div class="modal-actions">
        <button id="save-add-task">Save</button>
        <button id="cancel-add-task">Cancel</button>
    </div>
    `
    overlay.style.display = "flex";

    document.getElementById("save-add-task").addEventListener("click", () => {
        const newTitle = document.getElementById("add-task-name").value.trim();
        const newDescription = document.getElementById("add-task-desc").value;
        const newPriority = document.getElementById("add-task-priority").valueAsNumber;
        const newDate = document.getElementById("add-task-date").value;
        if (!newTitle) {
            alert("Task name cannot be empty!");
            return;
        }
        else if (project.getTask(newTitle)) {
            alert("Can't duplicate Task names in any one project!");
            return;
        }
        else UserFunctions.addTaskToProject(project, newTitle, newDescription, newPriority, newDate);
        overlay.style.display = "none";
        modal.innerHTML = ``;
        renderProjectContent(project.name);
    });

    document.getElementById("cancel-add-task").addEventListener("click", () => {
        overlay.style.display = "none";
        modal.innerHTML = ``;
    });
}

function showEditTaskModal(project, task) {
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    modal.innerHTML =
        `
    <h3>Edit Task</h3>
    <label for="edit-task-name">Title:</label>
    <input type="text" id="edit-task-name" value="${task.name}">
    <br>
    <label for="edit-task-desc">Description:</label><br>
    <textarea id="edit-task-desc">${task.description}</textarea>
    <br>
    <label for="edit-task-priority">Priority:</label>
    <input type="number" id="edit-task-priority" max="4" min="1" value="${task.priority}">
    <br>
    <label for="edit-task-date">Due Date:</label>
    <input type="date" id="edit-task-date" value="${task.dueDateForModal}">
    <div class="modal-actions">
        <button id="save-edit-task">Save</button>
        <button id="cancel-edit-task">Cancel</button>
    </div>
    `
    overlay.style.display = "flex";

    document.getElementById("save-edit-task").addEventListener("click", () => {
        const newTitle = document.getElementById("edit-task-name").value.trim();
        if (!newTitle) {
            alert("Task name cannot be empty!");
            return;
        }
        else if (newTitle != task.name) {
            if (project.getTask(newTitle)) {
                alert("Can't duplicate Task names in any one project!");
                return;
            }
            else {
                UserFunctions.setTaskName(task, newTitle);
            }
        }
        const newDescription = document.getElementById("edit-task-desc").value;
        UserFunctions.setTaskDescription(task, newDescription);
        const newPriority = document.getElementById("edit-task-priority").valueAsNumber;
        UserFunctions.setTaskPriority(project, task, newPriority);
        const newDate = document.getElementById("edit-task-date").value;
        UserFunctions.setTaskDate(project, task, newDate);
        overlay.style.display = "none";
        modal.innerHTML = ``;
        renderProjectContent(project.name);
    });

    document.getElementById("cancel-edit-task").addEventListener("click", () => {
        overlay.style.display = "none";
        modal.innerHTML = ``;
    });
}

function showDeleteTaskModal(project, task) {
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal-content");
    modal.innerHTML =
        `
    <h3>Delete Task</h3>
    <h4>${task.name}</h4>
    <p>Are you sure you want to delete this task?</p>
    <div class="modal-actions">
        <button id="save-delete-task">Confirm</button>
        <button id="cancel-delete-task">Cancel</button>
    </div>
    `
    overlay.style.display = "flex";

    document.getElementById("save-delete-task").addEventListener("click", () => {
        UserFunctions.deleteTaskFromProject(project, task);
        overlay.style.display = "none";
        modal.innerHTML = ``;
        renderProjectContent(project.name);
    });

    document.getElementById("cancel-delete-task").addEventListener("click", () => {
        overlay.style.display = "none";
        modal.innerHTML = ``;
    });
}

function initializeTasksToggle() {
    const toggleBtn = document.getElementById("toggle-completed-btn");
    function updateToggleBtn() {
        if (UserFunctions.getShowCompletedTasks()) {
            toggleBtn.textContent = "Hide Completed Tasks";
        } else {
            toggleBtn.textContent = "Show Completed Tasks";
        }
    }
    updateToggleBtn();
    toggleBtn.addEventListener("click", () => {
        UserFunctions.userToggleShowCompletedTasks();
        updateToggleBtn();
        const active = document.querySelector(".project-link.active");
        renderProjectContent(active ? (active.dataset.project || "Inbox") : "Inbox");
    })
}

export default function initialRender() {
    renderProjects();
    document.getElementById("inbox-link").classList.add("active"); // Want to start with inbox of course
    renderProjectContent("Inbox");
    initializeTasksToggle();
}