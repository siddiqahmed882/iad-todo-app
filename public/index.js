import { getDataFromDb, postDataToDb, deleteDataFromDb, updateDataInDb } from './db.js';

const form = document.querySelector('.new-todo-form');
const parentContainer = document.querySelector('.todos');

parentContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('todo__btn')) {
    const id = event.target.parentElement.querySelector('.todo__checkbox').id;
    try {
      await deleteDataFromDb(`/${id}`);
      await init();
    } catch (error) {
      console.log(error);
    }
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const body = { title: form.title.value };
  console.log(body);
  try {
    const { task } = await postDataToDb('/', body);
    console.log(task);
    await init();
  } catch (error) {
    console.log(error);
  }
});

const init = async () => {
  const { tasks } = await getDataFromDb('/');
  clearTodos();

  tasks.forEach((task) => {
    const newTask = document.createElement('article');
    newTask.classList.add('todo');
    newTask.innerHTML = `
        <div class="todo__content">
          <input type="checkbox" class="todo__checkbox" id=${task._id} ${task.isCompleted ? 'checked' : null} />
          <label for=${task._id} class="todo__text">${task.title}</label>
        </div>
        <button class="todo__btn">Delete</button>
    `;

    newTask.querySelector('.todo__checkbox').addEventListener('change', updateTodo);
    parentContainer.appendChild(newTask);
  });

  console.log(tasks);
};

const updateTodo = async (event) => {
  const id = event.target.id;
  const body = { isCompleted: event.target.checked };
  try {
    const { task } = await updateDataInDb(`/${id}`, body);
    console.log(task);
  } catch (error) {
    console.log(error);
  }
};

const clearTodos = () => {
  const parentContainer = document.querySelector('.todos');
  while (parentContainer.firstChild) {
    parentContainer.firstChild.remove();
  }
};

document.addEventListener('DOMContentLoaded', init);
