
const inputValue = document.querySelector(".input__field input");
const addBtn = document.querySelector(".input__field button");
const todoList = document.querySelector(".todo__list");
const deleteAllBtn = document.querySelector(".delete__btn");

inputValue.onkeyup = () =>{
    let userEnteredValue = inputValue.value;
    if(userEnteredValue.trim() != 0 ) { 
        addBtn.classList.add("active"); 
    }
    else{
        addBtn.classList.remove("active");
    }
}


showTasks();

addBtn.onclick = () => { 
    let userEnteredValue = inputValue.value; 
    let getLocalStorageData = localStorage.getItem("Новая задача"); 

    if(getLocalStorageData == null){ 
        listArray = [];
    }
    else{
        listArray = JSON.parse(getLocalStorageData);  
    }
    listArray.push(userEnteredValue); 
    localStorage.setItem("Новая задача", JSON.stringify(listArray)); 

    showTasks();

    addBtn.classList.remove("active"); 
}


function showTasks(){
    let getLocalStorageData = localStorage.getItem("Новая задача");

    if(getLocalStorageData == null){
        listArray = [];
    }
    else{
        listArray = JSON.parse(getLocalStorageData); 
    }

    const pendingTasksNumb = document.querySelector(".pending__task");
    pendingTasksNumb.textContent = listArray.length; 

    if(listArray.length > 0){ 
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active"); 
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; 
    inputValue.value = "";
}

function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("Новая задача");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); 
    localStorage.setItem("Новая задача", JSON.stringify(listArray));
    showTasks(); 
}

deleteAllBtn.onclick = ()=>{
    listArray = []; 
    localStorage.setItem("Новая задача", JSON.stringify(listArray));
    showTasks();
}