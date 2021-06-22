import { Component, ViewChild } from '@angular/core';

import { TaskCategory } from './app.model';

import { TodoStore } from './todo.store';
import {
  Init_Category,
  INIT_TASKCATEGORY_STATE,
  TaskCategoryState
} from './task.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('categoryName') inputName;
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
      this.inputName.nativeElement.value = ' ';
    }
  }

  selectTaskCategory(index: number, category: TaskCategory) {
    this.categoryId = category.id;

    this.taskStore.updateTaskViewer({
      taskCategoryName: category.name,
      index: index
    });
    //this.taskStore.selectTaskCategory(categoryId);
  }
}
