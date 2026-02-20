import { getActiveProject } from "./state.js";

const app = document.getElementById("app");
const sidebar = document.getElementById("projectSidebar");
const activeTodos = document.getElementById("activeTodoList");
const details = document.getElementById("todoDetails");

export const renderTodoList = () => {
    activeTodos.textContent = "";
    const activeProject = getActiveProject();
    if (!activeProject) return
    const todos = activeProject.todos;

    for (const todo of todos) {
        activeTodos.appendChild(createTodoRow(todo));
    }
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.id = "addBtn";
    addBtn.textContent = "Add New Todo";
    activeTodos.appendChild(addBtn);
};

const createTodoRow = (todo) => {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.dataset.id = todo.id;
        newTodoDiv.className = "todo";
        const todoTitle = document.createElement("div");
        todoTitle.className = "todoTitle";
        todoTitle.textContent = todo.title;
        newTodoDiv.appendChild(todoTitle);
        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.checked = todo.completed;
        if (todo.completed) {newTodoDiv.classList.add("completed")}
        newTodoDiv.appendChild(toggle);


        return newTodoDiv;
    }

export const renderAddTodoForm = () => {

    const form = document.createElement("form");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const submitBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    titleLabel.textContent = "Title: ";
    titleLabel.htmlFor = "title";
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.placeholder = "Title...";
    titleInput.name = "title";
    submitBtn.textContent = "Submit";
    submitBtn.type = "submit";
    submitBtn.id = "submitBtn";
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.id = "cancelBtn";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    return form;
};

export const renderFormView = () => {
    activeTodos.textContent = "";
    activeTodos.appendChild(renderAddTodoForm());
};
