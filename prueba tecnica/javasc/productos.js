

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = '';

/**
 * 
 * @param {string} title 
 * @param {string} description 
 */
const saveTask = (title, description) =>
  db.collection("producto").doc().set({
    title,
    description,
  });

const getTasks = () => db.collection("producto").get();

const onGetTasks = (callback) => db.collection("producto").onSnapshot(callback);

const deleteTask = (id) => db.collection("producto").doc(id).delete();

const getTask = (id) => db.collection("producto").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('producto').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
      
      <div class="card2 card-body  border-primary Fuentetitulos o-font3">
    <h3 class="Fuentetitulos o-font2">${task.title}</h3>
    <p>Cantidad:${task.description}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
         Borrar
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
         Editar
      </button>
    </div>
  </div>
  `;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Editar";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(title.value, description.value);
    } else {
      await updateTask(id, {
        title: title.value,
        description: description.value,
      })

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Guardar';
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});