let projects = [];

const createProject = ({ title = "My Project" } = {}) => ({
    id: crypto.randomUUID(),
    title,
    todos: [],
});


let activeProjectId = null;
let selectedTodoId = null;
let detailsMode = "closed";

const createTodo = ({ title, description, dueDate, priority = "low", notes = "", completed = false }) => ({
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    notes,
    completed,
});

export const getActiveProject = () => {
    for (const project of projects) {
        if (project.id === activeProjectId) {
            return project;
        } 
    }
        return null;
};

export const addTodo = (todoData) => {
    const active = getActiveProject();
    if (!active) return;
    const todoObj = createTodo(todoData);
    active.todos.push(todoObj);
    saveState();
};

export const addProject = (projectData) => {
    projects.push(createProject(projectData));
}

export const toggleTodo = (todoId) => {

    const project = getActiveProject();

    if (!project) return;

    const todo = project.todos.find(({ id }) => id === todoId);

    if (!todo) return;

    todo.completed = !todo.completed;
    saveState();
}

export const selectTodo = (todoId) => {
    if (todoId === selectedTodoId) {
        selectedTodoId = null
    }
    else {
        selectedTodoId = todoId
    }
}

export const getSelectedTodo = () => {
    if (!selectedTodoId) return null;
    
        const activeProject = getActiveProject();
        if (!activeProject) return null;

        const selectedTodo = activeProject.todos.find(({ id }) => id === selectedTodoId);

        return selectedTodo;
}

export const deleteSelectedTodo = () => {
    if (!selectedTodoId) return;

    const activeProject = getActiveProject();
    if (!activeProject) return;

    const indexToRemove = activeProject.todos.findIndex(todo => todo.id === selectedTodoId);
    if (indexToRemove > -1) {
    activeProject.todos.splice(indexToRemove, 1);
    selectedTodoId = null;
    }
    saveState();
}

export const clearSelectedTodo = () => {
    selectedTodoId = null;
}

const saveState = () => {
    const jsonArray = JSON.stringify(projects);
    localStorage.setItem("todoAppProjects", jsonArray);
}

const loadState = () => {
    const storedJsonArray = localStorage.getItem("todoAppProjects");
    if (!storedJsonArray) return false;
    projects = JSON.parse(storedJsonArray);
    return true;
}

const init = () => {
    if (loadState()) {
        activeProjectId = projects[0]?.id??null;
    } else {
    const defaultProject = createProject();
    projects.push(defaultProject);
    activeProjectId = defaultProject.id;
    }
}

export const getProjects = () => {
    return projects;
}

export const getActiveProjectId = () => {
    return activeProjectId;
}

export const selectProject = (projectId) => {
        activeProjectId = projectId
}

export const deleteSelectedProject = () => {
    if (projects.length === 1) return;

    const indexToRemove = projects.findIndex(project => project.id === activeProjectId);
    if (indexToRemove > -1) {
    projects.splice(indexToRemove, 1);
    selectedTodoId = null;
    activeProjectId = projects[0].id;
    }
    
    saveState();
}

export const openAddTodo = () => {
    detailsMode = "add";
    selectedTodoId = null;
}

export const openEditTodo = () => {
    if (!selectedTodoId) return;
    detailsMode = "edit";
}

export const openViewTodo = () => {
    if (!selectedTodoId) return;
    detailsMode = "view";
}

export const closeDetails = () => {
    detailsMode = "closed";
}

export const getDetailsMode = () => {
    return detailsMode;
}

export const updateSelectedTodo = ({title, description, dueDate, priority, notes, completed}) => {
    const selectedTodo = getSelectedTodo();
    selectedTodo.title = title;
    selectedTodo.description = description;
    selectedTodo.dueDate = dueDate;
    selectedTodo.priority = priority;
    selectedTodo.notes = notes;
    selectedTodo.completed = completed;

    saveState();
    openViewTodo();
}

init();