import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuElement, Task } from '../app.model';
import { TaskService } from '../task.service';
import { Init_Task } from '../task.state';
import { TodoStore } from '../todo.store';




@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  taskViewer$ = this.taskStore.taskViewer$;
  newTask : Task = Init_Task;
  @Input() categoryId : string;


  @ViewChild('taskName') inputName;
  taskList:Task[]=[];
  menus:MenuElement[]=[];
  task: Task ;
  status:boolean;


   

  

  constructor(private taskStore :TodoStore){}
  ngOnInit(){
    this.getTasks(this.categoryId);
  }


  addTask(){

    this.taskStore.addTask(this.newTask);
    this.inputName.nativeElement.value = ' ';
  }

  
   
  change(event){
   this.taskStore.change(event);
  }

  getTasks(categoryId){
    this.taskStore.getTasks(categoryId);
  }
}
