import { Component, OnInit } from '@angular/core';
import { TodoCreate } from 'src/app/Models/TodoCreate';
import { Todo } from 'src/app/Models/Todo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  name:string="";
  todos:Todo[]=[];
  constructor(
    // private _service:TodoService
  ) { }

  ngOnInit(  ): void {
    this.todos=this.getTodosFromLocalStorage();
  }
  public showButtons(id:string){
    const td=document.getElementById(id);
    td!.style.visibility="visible";
  }
  public HideButtons(id:string){
    const td=document.getElementById(id);
    td!.style.visibility="hidden";
  }
  public getTodosFromLocalStorage():[]{
      const todosJSON = localStorage.getItem('todos');
      if (todosJSON) {
        return JSON.parse(todosJSON);
      } else {
        return [];
      }
  }
  public saveTodosToLocalStorage(todos: Todo[]): void {
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem('todos', todosJSON);
  }
  public Delete(id:string){
    this.todos = this.todos.filter((todo)=> todo.id !== id);
    this.saveTodosToLocalStorage(this.todos);
  }
  public Create(){
    if(this.name!=""){
      var newtodo : Todo ={ title: this.name, id:uuidv4(), state:false};
      this.todos.push(newtodo);
      this.saveTodosToLocalStorage(this.todos);
      this.name="";
    }
  }
  public ChangeState(id:string){
    var todo :Todo|undefined = this.todos.find(todo=>todo.id===id);
    if(todo){
      todo.state=!todo?.state;
    }
  }

}

