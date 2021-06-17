import { Component, ViewChild } from '@angular/core';
import { TaskService } from './task.service';
import { TaskCategory } from './app.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TodoStore } from './todo.store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  

  taskViewer$ = this.taskStore.taskViewer$;

  constructor( private taskStore :TodoStore) {}
 
    
  addTaskCategory(){
    this.taskStore.addTaskCategory()
    
}
  saveCredentials(categoryId:string,categoryName:string){
    this.taskStore.saveCredentials(categoryId,categoryName);
  }

  
}
