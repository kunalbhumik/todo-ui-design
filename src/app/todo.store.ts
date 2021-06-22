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


@Injectable({
  providedIn: 'root'
})
export class TodoStore {
  private taskViewrObservable = new BehaviorSubject<TaskViewerState>(
    INIT_TASKVIEWER_STATE
  );
  taskViewer$ = this.taskViewrObservable.asObservable();
  constructor(private taskService: TaskService) {
    this.getTaskCategoryViewer();
    //this.getTaskViewer();
    this.getMenus();
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
    this.getMenus();
  }

  public updateTaskViewer(taskViewerP: Partial<TaskViewerState>) {
    this.taskViewrObservable.next({
      ...this.taskViewrObservable.value,
      ...taskViewerP
    });
  }

  getMenus(){
    

     this.taskService.getMenuList().subscribe(menus => {
      menus = menus;
      console.log(menus);
       let categories = [...this.taskViewrObservable.getValue().taskCategoryState];
      let categoryTask = categories[this.taskViewrObservable.getValue().index];
      categoryTask.menus = menus;
      
      
        
       this.updateTaskViewer({taskCategoryState : categories}); 
    });
   
  }

  
addTaskCategory(newTaskCategory: TaskCategory) {
    this.taskService
      .postTaskCategory(newTaskCategory)
      .subscribe(taskCategory => {

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
        tasks: [...taskCategoryState.tasks, newTask]
      };
     let categories = [...this.taskViewrObservable.getValue().taskCategoryState];
      let categoryTask = categories[this.taskViewrObservable.getValue().index];
      categoryTask.tasks = newState.tasks;
      this.updateTaskViewer({taskCategoryState : categories}); 
      this.updateTaskViewer({
        taskCategoryState: [...this.taskViewrObservable.value.taskCategoryState]
      });
    });
  }
  selectTaskCategory(categoryId : string) {
    this.updateTaskViewer({ index });
    this.getTasks(categoryId);

  }

  // change(event) {
    
  //   this.taskViewrObservable.value.taskList.forEach(item => {
  //     if (item.name === event.option.value) {
  //       item.status = !item.status;
  //     }
  //   });
  // }

  
 
}
