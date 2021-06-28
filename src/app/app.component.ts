import { Component, ViewChild } from '@angular/core';

import { TaskCategory } from './app.model';

import { TodoStore } from './todo.store';
import {
  Init_Category,
  INIT_TASKCATEGORY_STATE,
  TaskCategoryState
} from './task.state';
import { async } from '@angular/core/testing';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  categoryNameSearch: string = '';
  categoryId: string;
  taskViewer$ = this.taskStore.taskViewer$;
  newTaskCategory: TaskCategory = Init_Category;

  constructor(private taskStore: TodoStore) {}

  addTaskCategory() {
    if (this.newTaskCategory.name === '') {
      alert('List with no name is not allowed!!!');
    } else {
      this.taskStore.addTaskCategory(this.newTaskCategory);
      this.newTaskCategory = { ...Init_Category };
      this.newTaskCategory.name = "";
    }
  }

  selectTaskCategory(categoryState: TaskCategoryState) {
   
      this.taskStore.selectTaskCategory(categoryState);
    
    
  }

  deleteCategory(categoryState:TaskCategoryState){
    if(confirm("Are you sure to delete: "+categoryState.taskCategory.name)) {
    this.taskStore.deleteCategory(categoryState);
  }
  }
}
