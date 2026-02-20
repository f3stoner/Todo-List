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

export const toggleTodo = (projectId, todoId) => {

    const project = projects.find(({ id }) => id === projectId);

    if (!project) return;

    const todo = project.todos.find(({ id }) => id === todoId);

    if (!todo) return;

    todo.completed = !todo.completed;
}