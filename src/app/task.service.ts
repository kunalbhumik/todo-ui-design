import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuElement, Task, TaskCategory } from './app.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskCategory : TaskCategory;
  icon : string[];

  constructor(private http: HttpClient) {}

  getTaskCategories() {
    //return this.http.get<TaskCategory[]>('assets/task-categories.json');
   
  return this.http.get('https://test1-d85a6-default-rtdb.firebaseio.com/categories.json') ;
  
  }

  getTaskList() {
    return this.http.get<Task[]>('https://test1-d85a6-default-rtdb.firebaseio.com/tasks.json');
  }

  getMenuList() {
    return this.http.get<MenuElement[]>('assets/option-menu/menu.json');
  }
  
  postTask(task:Task){
    
     return this.http.post<Task>('https://test1-d85a6-default-rtdb.firebaseio.com/tasks.json',task);
  }

  postTaskCategory(taskCategory:TaskCategory){
    return this.http.post<TaskCategory>('https://test1-d85a6-default-rtdb.firebaseio.com/categories.json',taskCategory);
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

  

}
