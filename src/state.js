let projects = [];

const createProject = ({ title = "My Project" } = {}) => ({
    id: crypto.randomUUID(),
    title,
    todos: [],
});


let activeProjectId = null;
let selectedTodoId = null;

const createTodo = ({ title, description, dueDate, priority = "low", notes = "" }) => ({
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    notes,
    completed: false,
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

init();