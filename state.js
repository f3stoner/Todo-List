const projects = [];
const defaultProject = createProject();
projects.push(defaultProject);

let activeProjectId = defaultProject.id;
let selectedTodoId = null;

const createProject = ({ title = "My Project" }) => ({
    id: crypto.randomUUID(),
    title,
    todos: [],
});

const createTodo = ({ title, description, dueDate, priority = "low", notes = "" }) => ({
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    notes,
    completed: false,
});

const getActiveProject = () => {
    for (const project of projects) {
        if (project.id === activeProjectId) {
            return project;
        } 
    }
        return null;
}

const addTodo = (todo) => {
    const active = getActiveProject();
    if (!active) return;
    
    active.todos.push(todo);
}

const toggleTodo = (projectId, todoId) => {

    const project = projects.find(({ id }) => id === projectId);

    if (!project) return;

    const todo = project.todos.find(({ id }) => id === todoId);

    if (!todo) return;

    todo.completed = !todo.completed;
}