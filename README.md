# To-Do List App

A simple front-end to-do list application built as part of my working through the Odin Project curriculum, built with vanilla JavaScript. Supports multiple projects, persistent local storage (remote storage perhaps coming some day), and opinionated but intuitive task sorting.

## Features

* **Projects**: Add, edit, and delete projects.
    * Each project has a unique name, with an optional description.
    * A default Inbox project always exists and cannot be removed.
* **Tasks**: Add, edit, and delete tasks within each project.
    * Each task has a name unique within its project, optional description, priority, and required due date.
* **Opinionated Sorting**: Tasks are sorted within a project first by priority then by due date.
* **Persistent Data**: All data is stored using Local Storage for the time being.

Can be used via the Github Pages link, but feel free to clone the repository and run `npm run build` if you want a local copy. Or run as a server with `npm run dev`.