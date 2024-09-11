import "./style.css";

interface Todo {
  readonly id: string;
  title: string;
  isCompleted: boolean;
}

const TodoArr: Todo[] = [];

let todoContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.getElementsByTagName("input")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    id: String(Math.random() * 100),
    title: todoInput.value,
    isCompleted: false,
  };

  TodoArr.push(todo);
  todoInput.value = "";
  renderTodo(TodoArr);
};

const generatorItem = (id: string, title: string, isCompleted: boolean) => {
  // creating a todo div tag
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todoItemCss";

  // creating a check box
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => {
    TodoArr.find((item) => {
      if (item.id === id) return (item.isCompleted = checkbox.checked);
    });
    paragraph.className = checkbox.checked ? "textCut" : "title";
  };

  // creating p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.className = "title";
  paragraph.innerText = title;
  paragraph.className = checkbox.checked ? "textCut" : "title";


  // creating button for delete todo
  const deleteBtn: HTMLButtonElement = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = () => {
    deleteItem(id);
  };

  // appending all todo items
  todo.append(checkbox, paragraph, deleteBtn);

  todoContainer.append(todo);
};

const renderTodo = (todo: Todo[]) => {
  todoContainer.innerText = "";
  todo.forEach((item) => {
    generatorItem(item.id, item.title, item.isCompleted);
  });
};

const deleteItem = (id: string) => {
  let idX = TodoArr.findIndex((item) => item.id === id);
  TodoArr.splice(idX, 1);
  renderTodo(TodoArr);
};
