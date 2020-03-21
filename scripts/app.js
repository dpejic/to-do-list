class Task {
    constructor(text) {
        this.text = text;
        this.isCompleted = false;
    }
}

class Item {
    
    constructor(selectedHtmlElement) {
        this.tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
        this.selectedHtmlElement = selectedHtmlElement;
        this.render(this.tasks);
    }

    render(tasks) {
        this.selectedHtmlElement.innerHTML = "";
        this.addListWithTasks(tasks);
    }

    addTaskToList(text) {
        if(text == "" || text == null) {
            alert("It would be to easy for you :)");
        }
        else {
            this.tasks.push(new Task(text));
            this.saveTaskInLocalStorage();
            this.render(this.tasks);
        }
    }

    addListWithTasks(tasks) {

        tasks.forEach((task, taskIndex) => {
            let div = document.createElement("div");
            div.setAttribute("class", "input-group mb-3");

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("disabled", "true");
            input.value = task.text;

            input.addEventListener("keyup", (event) => {
                if(event.key == "Enter") {
                    task.text = input.value;
                    this.saveTaskInLocalStorage();

                    input.setAttribute("disabled", "true");
                }
            });

            let input_group = document.createElement("div");
            input_group.setAttribute("class", "input-group-append");

            if(task.isCompleted) {
                input.style.textDecoration = "line-through";
            }
            else {
                let button_edit = document.createElement("button");
                button_edit.setAttribute("type", "button");
                button_edit.setAttribute("class", "btn btn-warning border-left");
                button_edit.addEventListener("click", () => {
                    input.removeAttribute("disabled");
                    input.focus();
                });
                let i_edit = document.createElement("i");
                i_edit.setAttribute("class", "fa fa-edit");

                let button_finish = document.createElement("button");
                button_finish.setAttribute("type", "button");
                button_finish.setAttribute("class", "btn btn-success");
                button_finish.addEventListener("click", () => {
                    task.isCompleted = true;
                    this.saveTaskInLocalStorage();

                    input.style.textDecoration = "line-through";
                    button_finish.blur();
                    button_finish.remove();
                    button_edit.remove();
                });

                let i_finish = document.createElement("i");
                i_finish.setAttribute("class", "fas fa-check");

                button_finish.appendChild(i_finish);
                button_edit.appendChild(i_edit);

                input_group.appendChild(button_finish);
                input_group.appendChild(button_edit);
            }

            let button_delete = document.createElement("button");
            button_delete.setAttribute("type", "button");
            button_delete.setAttribute("class", "btn btn-danger border-left");
            button_delete.addEventListener("click", () => {
                this.tasks = this.tasks.slice(0, taskIndex).concat(this.tasks.slice(taskIndex + 1, this.tasks.length));
                this.saveTaskInLocalStorage();
                this.render(this.tasks);
            });

            let i_delete = document.createElement("i");
            i_delete.setAttribute("class", "fas fa-trash-alt");

            div.appendChild(input);

            button_delete.appendChild(i_delete);
            input_group.appendChild(button_delete);

            div.appendChild(input_group);

            this.selectedHtmlElement.appendChild(div);
        });
    }

    saveTaskInLocalStorage() {
        window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
}

const elements = document.getElementById("elements");
let task = new Item(elements);

document.getElementById("button-add").addEventListener("click", () => {
    task.addTaskToList(document.getElementById("task").value);
});
document.getElementById("task").addEventListener("keyup", (event) => {
    if(event.key == "Enter") task.addTaskToList(document.getElementById("task").value);
});