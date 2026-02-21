import { getActiveProject } from "./state.js";
import { getSelectedTodo } from "./state.js";
import { getProjects } from "./state.js";
import { getActiveProjectId } from "./state.js";

const app = document.getElementById("app");
const projectSidebar = document.getElementById("projectSidebar");
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
        const todoTitle = document.createElement("div");
        const toggle = document.createElement("input");
        const todoDesc = document.createElement("div");
        const dueDate = document.createElement("div");

        newTodoDiv.dataset.id = todo.id;
        newTodoDiv.className = "todo";
        
        todoTitle.className = "todoTitle";
        todoTitle.textContent = todo.title;

        toggle.type = "checkbox";
        toggle.checked = todo.completed;
        if (todo.completed) {newTodoDiv.classList.add("completed")}
        
        todoDesc.className = "todoDesc";
        todoDesc.textContent = todo.description;
        
        dueDate.className = "dueDate";
        dueDate.textContent = todo.dueDate;

        newTodoDiv.appendChild(todoTitle);
        newTodoDiv.appendChild(toggle);
        newTodoDiv.appendChild(todoDesc);
        newTodoDiv.appendChild(dueDate);

        if (todo.priority === "high") {newTodoDiv.classList.add("priority-high")}
        if (todo.priority === "medium") {newTodoDiv.classList.add("priority-medium")}
        if (todo.priority === "low") {newTodoDiv.classList.add("priority-low")}

        return newTodoDiv;
    }

export const renderAddTodoForm = () => {

    const form = document.createElement("form");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const descLabel = document.createElement("label");
    const descInput = document.createElement("input");
    const dueDateLabel = document.createElement("label");
    const dueDateInput = document.createElement("input");
    const priorityLabel = document.createElement("label");
    const prioritySelect = document.createElement("select");
    const priorityHigh = document.createElement("option");
    const priorityMedium = document.createElement("option");
    const priorityLow = document.createElement("option");
    const submitBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    titleLabel.textContent = "Title: ";
    titleLabel.htmlFor = "title";
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.placeholder = "Title...";
    titleInput.name = "title";
    descLabel.textContent = "Description: ";
    descLabel.htmlFor = "desc";
    descInput.type = "text";
    descInput.id = "desc";
    descInput.placeholder = "Description of Todo...";
    descInput.name = "description";
    dueDateLabel.textContent = "Due Date: ";
    dueDateLabel.htmlFor = "dueDate";
    dueDateInput.type = "date";
    dueDateInput.id = "dueDate";
    dueDateInput.name = "dueDate";
    priorityLabel.textContent = "Priority Level: ";
    priorityLabel.htmlFor = "priority";
    prioritySelect.id = "priority";
    prioritySelect.name = "priority";
    priorityHigh.value = "high";
    priorityHigh.textContent = "High";
    priorityMedium.value = "medium";
    priorityMedium.textContent = "Medium";
    priorityLow.value = "low";
    priorityLow.textContent = "Low";

    prioritySelect.appendChild(priorityLow);
    prioritySelect.appendChild(priorityMedium);
    prioritySelect.appendChild(priorityHigh);

    submitBtn.textContent = "Submit";
    submitBtn.type = "submit";
    submitBtn.id = "submitBtn";
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.id = "cancelBtn";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    form.appendChild(prioritySelect);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    return form;
};

export const renderFormView = () => {
    activeTodos.textContent = "";
    activeTodos.appendChild(renderAddTodoForm());
};

export const renderDetailsPanel = () => {
    const selectedTodo = getSelectedTodo();
    if (!selectedTodo) {
        details.textContent = "";
        app.classList.remove("details-open");
    } else {
    const detailTitle = document.createElement("div");
    const detailDesc = document.createElement("div");
    const detailDueDate = document.createElement("div");
    const detailPriority = document.createElement("div");
    const detailNotes = document.createElement("div");
    const detailCompleted = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const closeBtn = document.createElement("button");

    detailTitle.textContent = selectedTodo.title;
    detailDesc.textContent = selectedTodo.description;
    detailDueDate.textContent = selectedTodo.dueDate;
    detailPriority.textContent = selectedTodo.priority;
    detailNotes.textContent = selectedTodo.notes;
    detailCompleted.textContent = selectedTodo.completed;
    deleteBtn.textContent = "Delete Todo";
    editBtn.textContent = "Edit Todo";
    closeBtn.textContent = "Close";
    deleteBtn.type = "button";
    editBtn.type = "button";
    closeBtn.type = "button";
    deleteBtn.id = "deleteBtn";
    editBtn.id = "editBtn";
    closeBtn.id = "closeBtn";
    
    details.appendChild(detailTitle);
    details.appendChild(detailDesc);
    details.appendChild(detailDueDate);
    details.appendChild(detailPriority);
    details.appendChild(detailNotes);
    details.appendChild(detailCompleted);
    details.appendChild(deleteBtn);
    details.appendChild(editBtn);
    details.appendChild(closeBtn);

    app.classList.add("details-open");
    }
}

export const renderProjectPanel = () => {
    projectSidebar.textContent = "";

    const projects = getProjects();
    const projectPanelTitle = document.createElement("div");
    projectPanelTitle.textContent = "My Projects";

    projectSidebar.appendChild(projectPanelTitle);

    for (const project of projects) {
        const newProjectDiv = document.createElement("div");
        newProjectDiv.dataset.id = project.id;
        newProjectDiv.className = "projectDiv";
        newProjectDiv.textContent = project.title;

        const activeId = getActiveProjectId();
        if (project.id === activeId) {newProjectDiv.classList.add("active")}
        projectSidebar.appendChild(newProjectDiv);
    }
}