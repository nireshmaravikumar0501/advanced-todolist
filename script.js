const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter="all"){

taskList.innerHTML="";

let filteredTasks = tasks.filter(task=>{
if(filter==="active") return !task.completed;
if(filter==="completed") return task.completed;
return true;
});

filteredTasks.forEach((task,index)=>{

let li=document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`
<span onclick="toggleTask(${index})">${task.text}</span>

<div class="task-actions">
<button onclick="toggleTask(${index})">Done</button>
<button onclick="editTask(${index})">Edit</button>
<button onclick="deleteTask(${index})">Delete</button>
</div>
`;

taskList.appendChild(li);

});

saveTasks();

}

function addTask(){

let text=taskInput.value.trim();

if(text===""){
alert("Enter task");
return;
}

tasks.push({
text:text,
completed:false
});

taskInput.value="";
renderTasks();
}

function toggleTask(index){
tasks[index].completed=!tasks[index].completed;
renderTasks();
}

function deleteTask(index){
tasks.splice(index,1);
renderTasks();
}

function filterTasks(type){
renderTasks(type);
}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
addTask();
}
});

renderTasks();
function editTask(index){

let newText = prompt("Edit your task:", tasks[index].text);

if(newText === null){
return;
}

newText = newText.trim();

if(newText === ""){
alert("Task cannot be empty");
return;
}

tasks[index].text = newText;

renderTasks();

}