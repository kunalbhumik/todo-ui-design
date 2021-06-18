import { Component, ViewChild } from '@angular/core';

import { TaskCategory } from './app.model';

import { TodoStore } from './todo.store';
import { Init_Category, TaskCategoryState } from './task.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskViewer$ = this.taskStore.taskViewer$;
  newTaskCategory: TaskCategory = Init_Category;

  constructor(private taskStore: TodoStore) {}

  addTaskCategory() {
    this.taskStore.addTaskCategory(this.newTaskCategory);
    this.newTaskCategory = Init_Category;
  }

  selectTaskCategory(index: number) {
    this.taskStore.selectTaskCategory(index);
  }
}
