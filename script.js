// LOAD DATA
window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  // SIMPAN NAMA
  const username = localStorage.getItem("username") || "";

  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  // TAMBAH TUDU
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // VALIDASI FORM
    if (content.innerHTML == "") {
      // SWAL2 POPUP
      Swal.fire({
        icon: "error",
        title: "Uups...",
        text: "Tudu kamu masih kosong!😭",
      });
    } else {
      const todo = {
        content: content.innerHTML,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime(),
      };

      todos.push(todo);

      // SORTING TUDU
      sorted_todos = todos.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });

      localStorage.setItem("todos", JSON.stringify(sorted_todos));

      // RESET ISI FORM
      content.innerHTML = null;

      DisplayTodos();
    }
  });
  DisplayTodos();
});

// TAMPIL TUDU
function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    // PILIH KATEGORI
    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    if (todo.category == "pribadi") {
      span.classList.add("pribadi");
    } else {
      span.classList.add("produktivitas");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<div role="textbox" class="list" contenteditable="false">${todo.content}`;

    //BUTTON UBAH DAN HAPUS
    edit.innerHTML = "Ubah";
    deleteButton.innerHTML = "Hapus";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    //TUDU SELESAI
    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    // UBAH
    edit.addEventListener("click", () => {
      const div = content.querySelector("div");
      div.setAttribute("contenteditable", true);
      div.focus();
      div.addEventListener("blur", () => {
        todo.content = content.innerText;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    // HAPUS
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
