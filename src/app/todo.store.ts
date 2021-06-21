import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from './task.service';
import {
  Init_Category,
  INIT_TASKCATEGORY_STATE,
  INIT_TASKVIEWER_STATE,
  TaskCategoryState,
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
  constructor(private taskService: TaskService,private http : HttpClient) {
    this.getTaskCategoryViewer();
    //this.getTaskViewer();
  }
  taskCategoryState: TaskCategoryState[] = [];
  getTaskCategoryViewer() {
    let taskCategoryState: TaskCategoryState[] = [];

    this.taskService.getTaskCategories().subscribe(tCategories => {
      Object.entries(tCategories).forEach(e => {
        let taskCategory = { id: e[0], ...e[1] };
        taskCategoryState.push({ ...INIT_TASKCATEGORY_STATE, taskCategory });
         
      });
    });

    /*let menuList: MenuElement[] = [];

    this.taskService.getMenuList().subscribe(menus => {
      menuList = menus;
       this.updateTaskViewer({ menus: menuList });
      
    });*/

    this.updateTaskViewer({taskCategoryState :taskCategoryState, loader: false, index: 0 });
  }

  getTasks(categoryId:string) {
    let tasks :Task[] = [];

    this.taskService.getTaskList().subscribe(taskList => {
      
      tasks.push(...Object.values(taskList).filter(item => item.categoryId == categoryId));
      let categories = [...this.taskViewrObservable.getValue().taskCategoryState];
      let categoryTask = categories[this.taskViewrObservable.getValue().index];
      categoryTask.tasks = tasks;
      this.updateTaskViewer({taskCategoryState : categories}); 
      
    });

    // this.http
    //   .get('https://test-ba90f-default-rtdb.firebaseio.com/tasks.json')
    //   .pipe(
    //     map(responseDate => {
    //       const postsArray = [];
    //       for (const key in responseDate) {
    //         if (responseDate.hasOwnProperty(key)) {
    //           tasks.push({ ...responseDate[key], id: key });
    //         }
    //       }
    //       return tasks;
    //     })
    //   )
    //   .subscribe(tasks => {});

    //this.updateTaskViewer({ taskList: tasks });
  }

  public updateTaskViewer(taskViewerP: Partial<TaskViewerState>) {
    this.taskViewrObservable.next({
      ...this.taskViewrObservable.value,
      ...taskViewerP
    });
  }

  
addTaskCategory(newTaskCategory: TaskCategory) {
    this.taskService
      .postTaskCategory(newTaskCategory)
      .subscribe(taskCategory => {
        
      });

     const taskCategoryState: TaskCategoryState = {
          ...INIT_TASKCATEGORY_STATE,
          taskCategory : newTaskCategory
        };

     this.updateTaskViewer({
          taskCategoryState: [
            ...this.taskViewrObservable.value.taskCategoryState,
            taskCategoryState
          ]
        });


  }
  addTask(newTask: Task) {
    const taskCategoryState = this.taskViewrObservable.value.taskCategoryState[
      this.taskViewrObservable.value.index
    ];
    newTask.categoryId = taskCategoryState.taskCategory.id;
    //this.taskList = [...this.taskList, {...this.task, categoryId : this.categoryId}];
    this.taskService.postTask(newTask).subscribe(task => {
      const newState = {
        ...taskCategoryState,
        tasks: [...taskCategoryState.tasks, task]
      };
      this.taskViewrObservable.value.taskCategoryState[
        this.taskViewrObservable.value.index
      ] = newState;
      this.updateTaskViewer({
        taskCategoryState: [...this.taskViewrObservable.value.taskCategoryState]
      });
    });
  }
  selectTaskCategory(categoryId : string) {
    this.updateTaskViewer({ index });
    this.getTasks(categoryId);

  }

  change(event) {
    /*
    this.taskViewrObservable.value.taskList.forEach(item => {
      if (item.name === event.option.value) {
        item.status = !item.status;
      }
    });*/
  }

 
}
