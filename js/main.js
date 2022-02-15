const  elTodoForm = findElement(".todo__form")
const  elTodoAddInput= findElement(".todo__input")
const elTodoList= findElement(".todo__list")
const  elTemplate= findElement(".todo__template").content;
const elTitle = document.querySelector('.elTodoList')
const elBtn=findElement("btns");
const elAllBtnInfo=findElement(".btn-all-text");
const elCompletedBtnInfo=findElement(".btn-completed-text");
const elAllUncompletedBtnInfo=findElement(".btn-uncompleted-text");
const elClearBtn=findElement(".clear-btn");
console.log(elClearBtn);

const renderInfo=(array)=>{
    elAllBtnInfo.textContent=array.length;
    const completedInfo=array.filter(todo=>todo.isCompleted);
    elCompletedBtnInfo.textContent= completedInfo.length;
    elAllUncompletedBtnInfo.textContent=array.length- completedInfo.length;    
}








const todos=[];


const renderTodos=((array,node)=>{
    node.innerHTML=null;
    // const calculyator=elTodoAddInput.length;
    //     console.log(calculyator)
    renderInfo(array)

    const todosFragment=document.createDocumentFragment()
    array.forEach(todo=>{

        
        const todoTemplate=elTemplate.cloneNode(true);


        
        
        findElement(".todo__title",todoTemplate).textContent=todo.title;
        findElement(".todo__input-chek",todoTemplate).dataset.todoId=todo.id;
        findElement(".todo__button",todoTemplate).dataset.todoId=todo.id;


        
        if(todo.isCompleted){
           
            
            findElement(".todo__input-chek",todoTemplate).chechbox=true;
            findElement(".todo__title",todoTemplate).style.textDecoration="line-through";

        }else{
            findElement(".todo__input-chek",todoTemplate).chechbox=false;
        }

        todosFragment.appendChild(todoTemplate)
    }) 
    node.appendChild(todosFragment)

})

elTodoForm.addEventListener("submit",(evt)=>{
    evt.preventDefault()


    const newInput=elTodoAddInput.value.trim();
    if(!newInput){
        return
    }


    const newTodo={
        id:todos[todos.length-1]?.id+1||0,
        title:newInput,
        isCompleted:false
    }

    todos.push(newTodo);
    renderTodos(todos,elTodoList);

    elTodoAddInput.value=null
})

const handleDeleteTodo=((id,array)=>{
    const foundIndex=array.findIndex((item)=>item.id===id);
    array.splice(foundIndex,1)
    renderTodos(array,elTodoList)

  
})
const handleCheckTodo=((id,array)=>{
    const foundTodo=array.find((item)=>item.id===id);
    foundTodo.isCompleted=!foundTodo.isCompleted;

    renderTodos(array,elTodoList)
})

elTodoList.addEventListener("click",(evt)=>{
   if(evt.target.matches(".todo__button")){
       const clickedToId=Number(evt.target.dataset.todoId);
       

       handleDeleteTodo(clickedToId,todos)
   }
   if(evt.target.matches(".todo__input-chek")){
    const changeTodoId=Number(evt.target.dataset.todoId);
    

    handleCheckTodo(changeTodoId,todos)
}
    
})

elClearBtn.addEventListener("click",(evt)=>{
    evt.preventDefault()
    elTodoList.innerHTML=null;
    elAllBtnInfo.textContent=null
elCompletedBtnInfo.textContent=null
elAllUncompletedBtnInfo.textContent=null

   
})

elBtn.addEventListener("click",(evt)=>{
    if(evt.target.matches(".btn-all")){
        renderTodos(todos,elTodoList)
    }if(evt.target.matches(".btn-completed")){
        const completedTodos=todos.filter((todo)=>todo.isCompleted);
        renderTodos(completedTodos,elTodoList)
    }if(evt.target.matches(".btn-uncompleted")){
        const uncompletedTodos=todos.filter((todo)=>!todo.isCompleted);
        renderTodos(uncompletedTodos,elTodoList)
    }

})







