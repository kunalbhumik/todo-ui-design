import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuElement, Task } from '../app.model';
import { TaskService } from '../task.service';
import { InitBlankTask } from '../task.state';
import { TodoStore } from '../todo.store';




@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent{
  taskViewer$ = this.taskStore.taskViewer$;
  newTask : Task = InitBlankTask;

  @ViewChild('taskName') inputName;
  taskList:Task[]=[];
  menus:MenuElement[]=[];
  task: Task ;
  status:boolean;
   

  

  constructor(private taskStore :TodoStore){}


  addTask(){

    this.taskStore.addTask(this.newTask);
    this.inputName.nativeElement.value = ' ';
  }

   
  change(event){
   this.taskList.forEach(item => {
     if(item.name === event.option.value){
       item.status = !item.status;
     }
   });
  }
}
