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

  constructor(private taskService: TaskService , private http:HttpClient, private taskStore :TodoStore) {}

  ngOnInit() {
    /*this.taskService.getTaskCategories().subscribe(result => {
      this.taskCategories = result;
    });   */

    
  addTaskCategory(){

    this.taskCategories = [...this.taskCategories,{...this.taskCategory , id:this.id}];

    this.taskService.postTaskCategory(this.taskCategory).subscribe(category => {
      
    })

    

    
    
  }

  saveCredentials(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
