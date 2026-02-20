const projects = [];

const createProject = ({ title = "My Project" } = {}) => ({
    id: crypto.randomUUID(),
    title,
    todos: [],
});

const defaultProject = createProject();
projects.push(defaultProject);
let activeProjectId = defaultProject.id;
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
};

export const toggleTodo = (todoId) => {

    const project = getActiveProject();

    if (!project) return;

    const todo = project.todos.find(({ id }) => id === todoId);

    if (!todo) return;

    todo.completed = !todo.completed;
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
}

export const clearSelectedTodo = () => {
    selectedTodoId = null;
}