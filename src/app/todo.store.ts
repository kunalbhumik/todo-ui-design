import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from './task.service';
import {
  InitBlankCategory,
  INIT_TASKVIEWER_STATE,
  TaskViewerState
} from './task.state';
import { TaskCategory, Task, MenuElement } from './app.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {
  private taskViewrObservable = new BehaviorSubject<TaskViewerState>(
    INIT_TASKVIEWER_STATE
  );
  taskViewer$ = this.taskViewrObservable.asObservable();
  constructor(private taskService: TaskService, private http: HttpClient) {
    this.getTaskCategoryViewer();
    this.getTaskViewer();
  }

  getTaskCategoryViewer() {
    let taskCategories: TaskCategory[] = [];

    /*this.taskService.getTaskCategories()
    .subscribe(tCategories => {
      Object.entries(tCategories).forEach(e=> taskCategories.push(e[1]));
    });*/

    this.http
      .get('https://test-ba90f-default-rtdb.firebaseio.com/categories.json')
      .pipe(
        map(responseDate => {
          const postsArray = [];
          for (const key in responseDate) {
            if (responseDate.hasOwnProperty(key)) {
              taskCategories.push({ ...responseDate[key], id: key });
            }
          }
          return taskCategories;
        })
      )
      .subscribe(tasks => {
        console.log(taskCategories);
      });

    let taskCategory = InitBlankCategory;

    taskCategory.id = '-McEhWZzovHUTh5p8UMv';
    taskCategory.name = 'My Day';
    this.saveCredentials(taskCategory);

    let menuList: MenuElement[] = [];

    this.taskService.getMenuList().subscribe(menus => {
      menuList = menus;
    });
    this.updateTaskViewer({ menus: menuList });

    this.updateTaskViewer({ taskCategories });
  }

  getTaskViewer() {
    let tasks: Task[] = [];
    this.http
      .get('https://test-ba90f-default-rtdb.firebaseio.com/tasks.json')
      .pipe(
        map(responseDate => {
          const postsArray = [];
          for (const key in responseDate) {
            if (responseDate.hasOwnProperty(key)) {
              tasks.push({ ...responseDate[key], id: key });
            }
          }
          return tasks;
        })
      )
      .subscribe(tasks => {});

    this.updateTaskViewer({ taskList: tasks });
  }

  public updateTaskViewer(taskViewerP: Partial<TaskViewerState>) {
    this.taskViewrObservable.next({
      ...this.taskViewrObservable.value,
      ...taskViewerP
    });
  }

  addTaskCategory() {
    let taskCategory = this.taskViewrObservable.value.taskCategory;

    this.taskService.postTaskCategory(taskCategory).subscribe(category => {});

    let categories = this.taskViewrObservable.value.taskCategories;
    categories = [...categories, taskCategory];
    this.updateTaskViewer({ taskCategories: categories });
  }

  addTask(newTask: Task) {
    newTask.categoryId = this.taskViewrObservable.value.categoryId;
    //this.taskList = [...this.taskList, {...this.task, categoryId : this.categoryId}];
    this.taskService.postTask(newTask).subscribe(task => {});

    let tasks = this.taskViewrObservable.value.taskList;
    tasks = [...tasks, newTask];
    this.updateTaskViewer({ taskList: tasks });

    console.log(tasks);
  }

  saveCredentials(taskCategory: TaskCategory) {
    console.log(taskCategory.id, taskCategory.name);

    this.taskViewrObservable.value.categoryId = taskCategory.id;
    this.taskViewrObservable.value.categoryName = taskCategory.name;
    console.log('Menus ', this.taskViewrObservable.value.menus);
  }
}
