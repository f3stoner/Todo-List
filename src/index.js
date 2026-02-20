import "./styles.css";
import { renderDetailsPanel, renderTodoList } from "./render.js";
import { addTodo, deleteSelectedTodo } from "./state.js";
import { toggleTodo } from "./state.js";
import { renderAddTodoForm } from "./render.js";
import { renderFormView } from "./render.js";
import { selectTodo } from "./state.js";
import { clearSelectedTodo } from "./state.js";

renderTodoList();

const activeTodos = document.getElementById("activeTodoList");
const details = document.getElementById("todoDetails");

activeTodos.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") return
    if (e.target.id === "addBtn") {renderFormView()};

    if (e.target.id === "cancelBtn") {renderTodoList()};

    const todoDiv = e.target.closest(".todo");
    if (!todoDiv) return;
    const todoId = todoDiv.dataset.id;
    selectTodo (todoId);
    renderDetailsPanel();
    });

activeTodos.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const desc = e.target.elements.description.value;
    const dueDate = e.target.elements.dueDate.value;
    const priority = e.target.elements.priority.value;
    addTodo({ title: title, description: desc, dueDate: dueDate, priority: priority });
    renderTodoList();
});

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
        
    }
})