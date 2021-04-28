/**
 * Created by unsorted-array on 6/26/17.
 */
var todoItems =[];//array
let todolist=null;// this is the list variable being made global

window.onload=function () {



    let newtodo = document.getElementById('new-to-do');
    let btnAdd =document.getElementById('btn-add-todo');
    let btnDel =document.getElementById('btn-clear-done');
    todolist =document.getElementById('To-Do-List');

    refresh();
    btnAdd.onclick=function () { AddandSave(newtodo.value) };
    btnDel.onclick=function () {
                DeleteDone();
    }




};



function DeleteDone( event) {


    todoItems=todoItems.filter(function (element,index,todoItems) {
        return !element.done;


    })
    savetodostostore();
    refresh();

}

function refresh() {

    restorefromstorage();
    addArrayToList( todolist ,todoItems);

}


function restorefromstorage() {

    let itemsinlocalstorage = localStorage.getItem('todolist');
    if(itemsinlocalstorage)
    {
        todoItems=JSON.parse(itemsinlocalstorage);
        
    }

}

function savetodostostore() {

    localStorage.setItem('todolist',JSON.stringify(todoItems));

}

function addArrayToList(todolist, itemArray) {

    if(!todolist)
    {
        return;
    }
    todolist.innerHTML ="";

    for(index in itemArray)
    {
       todolist.appendChild( addToList(index,itemArray[index].task,itemArray[index].done));
    }


}
function addToList(index, task,done) {


    let todocheckbox =document.createElement('input');
    todocheckbox.setAttribute('type', 'checkbox');

    todocheckbox.addEventListener('change',isDone);

    let todoItem =document.createElement('li');
    todoItem.className = 'list-group-item';

    todoItem.setAttribute('data-id', index);

    let textspan =document.createElement('span');
    textspan.innerText+=task;
    textspan.className='col-9';

    let moveUpButton = document.createElement('i');
    moveUpButton.className = 'fa  col-1 fa-arrow-circle-o-up fa-';


    moveUpButton.addEventListener('click', moveTaskUp);


    let movDownButton = document.createElement('i');
    movDownButton.className = 'fa col-1 fa-arrow-circle-o-down fa-1x';

    movDownButton.addEventListener('click', moveTaskDown);

    let taskDeleteButton = document.createElement('i');
    taskDeleteButton.className = 'fa fa-remove delete';
    taskDeleteButton.addEventListener('click', deleteTodo);


    if(done)
    {
        textspan.className+=' todo-done';
        todocheckbox.setAttribute('checked',true);
    }
    todoItem.appendChild(todocheckbox);
    todoItem.appendChild(textspan);
    todoItem.appendChild(moveUpButton);
    todoItem.appendChild(movDownButton);
    todoItem.appendChild(taskDeleteButton);
    return todoItem;




}
function moveTaskUp(event) {

    let idtomove =  event.target.parentElement.getAttribute('data-id');
   idtomove= parseInt(idtomove) //string issues
    //console.log(idtomove);
    var a =todoItems.splice(idtomove-1,0,todoItems.splice(idtomove,1)[0]);
    //console.log(a);
    savetodostostore();
    refresh();

}
function moveTaskDown(event) {

    console.log('hey');
    let idtomove =  event.target.parentElement.getAttribute('data-id');
   idtomove= parseInt(idtomove); //non mutable
    console.log(idtomove);

    todoItems.splice(idtomove+1,0,todoItems.splice(idtomove,1)[0]);

    savetodostostore();
    refresh();

}
function deleteTodo(event) {
    let idtomove =  event.target.parentElement.getAttribute('data-id');
    todoItems.splice(idtomove,1);
    savetodostostore();
    refresh();

}

function AddandSave(text) {

    let tempvar={
        task:text,
        done:false

    }
    todoItems.push(tempvar);
    savetodostostore();
    refresh();

}

function  isDone(event) {
 var DoneIndex = event.target.parentElement.getAttribute('data-id');//ask that why is it necessary to do fr parent element
    console.log('Done '+ DoneIndex);

   // console.log(event.target.parentElement)
    console.log(todoItems[DoneIndex])

   todoItems[DoneIndex].done=event.target.checked;
    savetodostostore();
    refresh();

}



