 //localStorage.todos = JSON.stringify([
 //{id: 1, content:"Tache 1", completed: true},
 //{id: 2, content:"Tache 2", completed: false},
 //]);

//Initialisation des todos à partir du localStorage ou d'un tableau vide si le localStorage est vide ou non défini.
//Récupération des éléments utiles
const todos = JSON.parse(localStorage.todos || "[]");
const appElement = document.querySelector(".todoapp");
const addInputElement = appElement.querySelector(".new-todo");
const todosContainer = appElement.querySelector(".todo-list");
const notCompletedCountElement = appElement.querySelector(".todo-count span");

// Pour chaque item des todos, on fait un ajout initial dans le DOM
todos.forEach(item => {
  appendNEwItemInDom(item);
    
});

renderNotCompletedCount();

//Ajoute un item dans le DOM et dans le tableau des todos, puis met à jour le localStorage et le compteur d'items non complétés.
//Toujours le faire avant de faire le outerhtml pour éviter les problèmes de réactivité du DOM.

function appendNEwItemInDom(item) {
    const newItem = document.createElement('div');
    todosContainer.append(newItem);
    newItem.outerHTML = `
    <li data-id="${item.id}" class="${item.completed ? 'completed' : ''}">
            <div class="view">
              <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''} />
              <label>${item.content}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${item.content}"/>
          </li>
          `;
          renderNotCompletedCount();
      }
// Ajoute un item dans le Array todos, puis met à jour le localStorage et le compteur d'items non complétés.
 function appendItemInArray(item){
    todos.push(item);
    updateLocalStorage();
  }
// Met à jour le localStorage avec le contenu actuel du tableau todos.
function updateLocalStorage() {
  localStorage.todos = JSON.stringify(todos);
} 

// Affichage du nombre de tâches non complétées
function renderNotCompletedCount() {
notCompletedCountElement.innerText = todos.filter
  (item => !item.completed).length + ' item(s) left';
}
 

//Capture des événements de changement sur l'input d'ajout de tâche

  addInputElement.addEventListener('change',function () {
    const newItem= {id: Date.now(), content: this.value, completed: false} ;
    appendItemInArray(newItem);
    appendNEwItemInDom(newItem);
    });
