import "./styles.css";
import { renderDetailsPanel, renderProjectPanel, renderTodoList } from "./render.js";
import { addTodo, closeDetails, deleteSelectedTodo, getDetailsMode, getSelectedTodo, openAddTodo, openEditTodo, openViewTodo, updateSelectedTodo } from "./state.js";
import { toggleTodo } from "./state.js";
import { selectTodo } from "./state.js";
import { clearSelectedTodo } from "./state.js";
import { selectProject } from "./state.js";
import { renderProjectFormView } from "./render.js";
import { addProject } from "./state.js";
import { deleteSelectedProject } from "./state.js";

renderTodoList();
renderProjectPanel();

const activeTodos = document.getElementById("activeTodoList");
const details = document.getElementById("todoDetails");
const projectSidebar = document.getElementById("projectSidebar");

activeTodos.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") return
    if (e.target.id === "addBtn") {
        openAddTodo();
        renderDetailsPanel();
        return;
    };

    const todoDiv = e.target.closest(".todo");
    if (!todoDiv) return;
    const todoId = todoDiv.dataset.id;
    selectTodo (todoId);
    openViewTodo();
    renderDetailsPanel();
    });

details.addEventListener("submit", (e) => {
    e.preventDefault();
    const detailsMode = getDetailsMode();
    if (detailsMode === "add") {
    const title = e.target.elements.title.value;
    const desc = e.target.elements.description.value;
    const dueDate = e.target.elements.dueDate.value;
    const priority = e.target.elements.priority.value;
    const notes = e.target.elements.notes.value;
    const completed = e.target.elements.completed.checked;
    addTodo({ title: title, description: desc, dueDate: dueDate, priority: priority, notes: notes, completed: completed });
    renderTodoList();
    closeDetails ();
    renderDetailsPanel();
    }
    else if (detailsMode === "edit") {
        const selectedTodo = getSelectedTodo();
        const title = e.target.elements.title.value;
        const description = e.target.elements.description.value;
        const dueDate = e.target.elements.dueDate.value;
        const priority = e.target.elements.priority.value;
        const notes = e.target.elements.notes.value;
        const completed = e.target.elements.completed.checked;

        updateSelectedTodo({title, description, dueDate, priority, notes, completed});
        renderTodoList();
        renderDetailsPanel();
    }
});

projectSidebar.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    addProject({ title: title });
    renderProjectPanel();
})

activeTodos.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;
    const todoDiv = e.target.closest(".todo");
    if (!todoDiv) return;
    const todoId = todoDiv.dataset.id;
    toggleTodo(todoId);
    renderTodoList();
})

details.addEventListener("click", (e) => {
    if (e.target.id === "deleteBtn") {
        if (confirm("Are you sure you want to delete this Todo?")){
            deleteSelectedTodo();
            renderTodoList();
            renderDetailsPanel();
        }
    }

    if (e.target.id === "closeBtn") {
        clearSelectedTodo();
        renderDetailsPanel();
    }

    if (e.target.id === "editBtn") {
        openEditTodo();
        renderDetailsPanel();
    }

    if (e.target.id === "cancelBtn") {
        closeDetails();
        renderDetailsPanel();
    };
})

projectSidebar.addEventListener("click", (e) => {
    if (e.target.id === "addProjectBtn") {renderProjectFormView()};

    if (e.target.id === "cancelProjectBtn") {renderProjectPanel()};

    if (e.target.id === "deleteProjectBtn") {
        if (confirm("Are you sure you want to delete this Project?")){
            deleteSelectedProject();
            renderProjectPanel();
            renderTodoList();
            renderDetailsPanel();
        }
    }

    const projectDiv = e.target.closest(".projectDiv");
    if (!projectDiv) return;
    const projectId = projectDiv.dataset.id;
    selectProject (projectId);
    renderProjectPanel();
    renderTodoList();
    renderDetailsPanel();
})
