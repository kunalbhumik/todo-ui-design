import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuElement, Task, TaskCategory } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskCategory : TaskCategory;
  icon : string[];

  constructor(private http: HttpClient) {}

  getTaskCategories() {
    return this.http.get<TaskCategory[]>('assets/task-categories.json');
  }

  getTaskList() {
    return this.http.get<Task[]>('https://test-ba90f-default-rtdb.firebaseio.com/tasks.json');
  }

  getMenuList() {
    return this.http.get<MenuElement[]>('assets/option-menu/menu.json');
  }
  
  postTask(task:Task){
    console.log(task);
     return this.http.post<Task>('https://test-ba90f-default-rtdb.firebaseio.com/tasks.json',task);
  }

  postTaskCategory(taskCategory:TaskCategory){
    return this.http.post<Task>('https://test-ba90f-default-rtdb.firebaseio.com/categories.json',taskCategory);
  }

  getBlankTask() {
    return {
      categoryId: null,
      name: null,
      userId: null,
      priorityId: null,
      assignedId: null,
      status:true
    };
  }

  getBlankCategory(){

 
      return {
        id:null,
        name:null,
        type:"C",
        icon:{
          name:"padding",
          color:"gray"
        }
      }

      
  }

}
