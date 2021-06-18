import { Component, ViewChild } from '@angular/core';
import { TaskService } from './task.service';
import { TaskCategory } from './app.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TodoStore } from './todo.store';
import { Init_Category } from './task.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  

  taskViewer$ = this.taskStore.taskViewer$;
  newTaskCategory : TaskCategory =Init_Category;
    

  constructor( private taskStore :TodoStore) {}
 
    
  addTaskCategory(){
    
   this.saveCredentials(this.newTaskCategory);
    this.taskStore.addTaskCategory();
    
}
  saveCredentials(taskCategory :TaskCategory){
    this.taskStore.updateTaskViewer({taskCategory:taskCategory});
    this.taskStore.saveCredentials(taskCategory);
  }

  
}
