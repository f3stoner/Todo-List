import "./styles.css";
import { renderTodoList } from "./render.js";
import { addTodo } from "./state.js";
import { toggleTodo } from "./state.js";
import { renderAddTodoForm } from "./render.js";
import { renderFormView } from "./render.js";

renderTodoList();

const activeTodos = document.getElementById("activeTodoList");

activeTodos.addEventListener("click", (e) => {
    if (e.target.id === "addBtn") {renderFormView()};

    if (e.target.id === "cancel") {renderTodoList()};

    });

activeTodos.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    addTodo({ title: title });
    renderTodoList();
});

console.log("This is nothing but a test");