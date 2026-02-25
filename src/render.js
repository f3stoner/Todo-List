import { getActiveProject, getDetailsMode } from "./state.js";
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
    const title = document.createElement("div");
    title.className = "todoListTitle";
    title.textContent = activeProject.title;
    activeTodos.appendChild(title);
    if (todos.length === 0) {
        const noTodos = document.createElement("div");
        noTodos.className = "noTodos";
        noTodos.textContent = "No todos yet! Please click 'Add New Todo'";
        activeTodos.appendChild(noTodos);
    }

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
        const toggleLabel = document.createElement("label");
        
        const dueDate = document.createElement("div");

        newTodoDiv.dataset.id = todo.id;
        newTodoDiv.className = "todo";
        
        todoTitle.className = "todoTitle";
        todoTitle.textContent = todo.title;

        toggle.type = "checkbox";
        toggle.checked = todo.completed;
        toggleLabel.textContent = "Completed Status: "
        toggleLabel.appendChild(toggle);
        if (todo.completed) {newTodoDiv.classList.add("completed")}
        
        dueDate.className = "dueDate";
        dueDate.textContent = todo.dueDate;

        newTodoDiv.appendChild(todoTitle);
        newTodoDiv.appendChild(dueDate);
        newTodoDiv.appendChild(toggleLabel);


        if (todo.priority === "high") {newTodoDiv.classList.add("priority-high")}
        if (todo.priority === "medium") {newTodoDiv.classList.add("priority-medium")}
        if (todo.priority === "low") {newTodoDiv.classList.add("priority-low")}

        return newTodoDiv;
    }

export const createTodoForm = (todo) => {
    const detailsMode = getDetailsMode();

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
    const notesLabel = document.createElement("label");
    const notesTextArea = document.createElement("textarea");
    const completedLabel = document.createElement("label");
    const completedToggle = document.createElement("input");
    const submitBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    

    titleLabel.textContent = "Title: ";
    titleLabel.htmlFor = "title";
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.name = "title";
    descLabel.textContent = "Description: ";
    descLabel.htmlFor = "desc";
    descInput.type = "text";
    descInput.id = "desc";
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
    notesLabel.textContent = "Notes: ";
    notesLabel.htmlFor = "notes";
    notesTextArea.id = "notes";
    notesTextArea.name = "notes";
    completedLabel.htmlFor = "completed";
    completedLabel.textContent = "Completed Status: ";
    completedToggle.id = "completed";
    completedToggle.name = "completed";
    completedToggle.type = "checkbox";
    submitBtn.type = "submit";
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.id = "cancelBtn";

    prioritySelect.appendChild(priorityLow);
    prioritySelect.appendChild(priorityMedium);
    prioritySelect.appendChild(priorityHigh);
    

    if (detailsMode === "add") {

        titleInput.placeholder = "Title...";
        descInput.placeholder = "Description of Todo...";
        notesTextArea.placeholder = "Notes...";
        submitBtn.textContent = "Submit";
        submitBtn.id = "submitBtn";
    }
    else if (detailsMode === "edit"){

        if (!todo) return;

        titleInput.value = todo.title;
        descInput.value = todo.description;
        dueDateInput.value = todo.dueDate;
        notesTextArea.value = todo.notes;
        completedToggle.checked = todo.completed;
        submitBtn.textContent = "Save";
        submitBtn.id = "saveBtn";
        prioritySelect.value = todo.priority;
    }

 
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);
    form.appendChild(notesLabel);
    form.appendChild(notesTextArea);
    form.appendChild(completedLabel);
    form.appendChild(completedToggle);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    return form;
};

export const renderDetailsPanel = () => {
    details.textContent = "";
    const detailsMode = getDetailsMode();

    if (detailsMode === "add") {
        details.appendChild(createTodoForm());
        app.classList.add("details-open");
        return;
    }

    else if (detailsMode === "closed") {
        app.classList.remove("details-open");
        return;
    }

    else if (detailsMode === "view") {
        const selectedTodo = getSelectedTodo();
        if (!selectedTodo) {
            app.classList.remove("details-open");
            return;
        } else {
        const detailTitle = document.createElement("div");
        const detailDesc = document.createElement("div");
        const detailDueDate = document.createElement("div");
        const detailPriority = document.createElement("div");
        const detailNotes = document.createElement("div");
        const detailCompletedLabel = document.createElement("label");
        const detailCompleted = document.createElement("input");
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const closeBtn = document.createElement("button");

        detailTitle.textContent = `Title: ${selectedTodo.title}`;
        detailDesc.textContent = `Description: ${selectedTodo.description}`;
        detailDueDate.textContent = `Due Date: ${selectedTodo.dueDate}`;
        detailPriority.textContent = `Priority Level: ${selectedTodo.priority}`;
        detailNotes.textContent = `Notes: ${selectedTodo.notes}`;
        detailCompletedLabel.htmlFor = "detailCompleted";
        detailCompletedLabel.textContent = "Completed Status: ";
        detailCompleted.id = "detailCompleted";
        detailCompleted.type = "checkbox";
        detailCompleted.checked = selectedTodo.completed;
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
        details.appendChild(detailCompletedLabel);
        details.appendChild(detailCompleted);
        details.appendChild(editBtn);
        details.appendChild(closeBtn);
        details.appendChild(deleteBtn);

        app.classList.add("details-open");
        }
    }
    else if (detailsMode === "edit") {
        const selectedTodo = getSelectedTodo();
        if (!selectedTodo) {
            app.classList.remove("details-open");
            return;
        } else {

            const form = createTodoForm(selectedTodo);
            const deleteBtn = document.createElement("button");

            deleteBtn.textContent = "Delete Todo";
            deleteBtn.type = "button";
            deleteBtn.id = "deleteBtn";
            
            details.appendChild(form);
            details.appendChild(deleteBtn);
        
            app.classList.add("details-open");

        }
    } 
    else {
        app.classList.remove("details-open");
        return;}
}

export const renderProjectPanel = () => {
    projectSidebar.textContent = "";

    const projects = getProjects();
    const projectPanelTitle = document.createElement("div");
    projectPanelTitle.textContent = "My Projects";
    projectPanelTitle.className = "title";

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

    const addProjectBtn = document.createElement("button");
    const deleteProjectBtn = document.createElement("button")
    addProjectBtn.type = "button";
    addProjectBtn.id = "addProjectBtn";
    addProjectBtn.textContent = "Add New Project";
    deleteProjectBtn.type = "button";
    deleteProjectBtn.id = "deleteProjectBtn";
    deleteProjectBtn.textContent = "Delete Project";
    projectSidebar.appendChild(addProjectBtn);
    projectSidebar.appendChild(deleteProjectBtn);
}

export const renderProjectFormView = () => {
    const form = document.createElement("form");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const submitBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    titleLabel.textContent = "Title: ";
    titleLabel.htmlFor = "titleProject";
    titleInput.type = "text";
    titleInput.id = "titleProject";
    titleInput.value = "Title...";
    titleInput.name = "title";   
    submitBtn.textContent = "Submit";
    submitBtn.type = "submit";
    submitBtn.id = "submitProjectBtn";
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.id = "cancelProjectBtn";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    projectSidebar.textContent = "";
    projectSidebar.appendChild(form);
}