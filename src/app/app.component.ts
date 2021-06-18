import { Component, ViewChild } from '@angular/core';
import { TaskService } from './task.service';
import { TaskCategory } from './app.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TodoStore } from './todo.store';
import { InitBlankCategory } from './task.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  

  taskViewer$ = this.taskStore.taskViewer$;
  newTaskCategory : TaskCategory =InitBlankCategory;
    

  constructor( private taskStore :TodoStore) {}
 
    
  addTaskCategory(){
    console.log(InitBlankCategory);
   this.saveCredentials(this.newTaskCategory);
    this.taskStore.addTaskCategory();
    
}
  saveCredentials(taskCategory :TaskCategory){
    this.taskStore.updateTaskViewer({taskCategory:taskCategory});
    this.taskStore.saveCredentials(taskCategory);
  }

  
}
