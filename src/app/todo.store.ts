import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { TaskService } from './task.service';
import {
  Init_Category,
Init_Task,
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
    
    //this.getMenus();
  }
  

  taskCategoryState: TaskCategoryState[] = [];
  getTaskCategoryViewer() {
    let taskCategoryStates: TaskCategoryState[] = [];

    this.taskService.getTaskCategories().subscribe(tCategories => {
      Object.entries(tCategories).forEach(e => {
        let taskCategory = { id: e[0], ...e[1] };
        taskCategoryStates.push({ ...INIT_TASKCATEGORY_STATE, taskCategory });
         
      });
    });

    let menus : MenuElement[];

   // menus = this.getMenus();
    //console.log(menus);
    //taskCategoryStates[0].menus = menus;
   //let taskCategoryState = taskCategoryStates[0];
   //taskCategoryState.menus = menus;

    this.updateTaskViewer({taskCategoryState :taskCategoryStates, loader: false, index: -1 });
  }

 

  public updateTaskViewer(taskViewerP: Partial<TaskViewerState>) {
    this.taskViewrObservable.next({
      ...this.taskViewrObservable.value,
      ...taskViewerP
    });
  }

  getMenus(){
    
      var menuList : MenuElement[] = [];
     this.taskService.getMenuList().subscribe(menus => {
      
      
       let categories = [...this.taskViewrObservable.getValue().taskCategoryState];
      let categoryTask = categories[this.taskViewrObservable.getValue().index];
      categoryTask.menus = menus;
      
      menuList  = menus;
      console.log(menuList)  
       
       this.updateTaskViewer({taskCategoryState : categories}); 
    });
    console.log(menuList)
    return menuList; 
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
  

  // change(event) {
    
  //   this.taskViewrObservable.value.taskList.forEach(item => {
  //     if (item.name === event.option.value) {
  //       item.status = !item.status;
  //     }
  //   });
  // }

  getNewTask(){
   return {...Init_Task};
  }

  getSelectedTaskCategory(index : number){
    let taskCategoryState =  this.taskViewrObservable.getValue().taskCategoryState[index];
    let tasks :Task[] = [];
    let  categoryId = taskCategoryState.taskCategory.id ;
   
    this.taskService.getTaskList().subscribe(taskList => {
      
      tasks.push(...Object.values(taskList).filter(item => item.categoryId == categoryId));
      let categories = [...this.taskViewrObservable.getValue().taskCategoryState];
      let categoryTask = categories[this.taskViewrObservable.getValue().index];
      categoryTask.tasks = tasks;
     
      let menus : MenuElement[] = this.getMenus();
      

      categoryTask.menus = menus;
      
      console.log(categoryTask.tasks);
      this.updateTaskViewer({taskCategoryState : categories}); 
      
    });
   
    return taskCategoryState;
  }
  selectTaskCategory(categoryState: TaskCategoryState){
    const index  = this.taskViewrObservable.getValue().taskCategoryState.indexOf(categoryState);
    this.updateTaskViewer({index});
  }

  getNewTaskCategoryState(){
    return { ...INIT_TASKCATEGORY_STATE};
  }
  
 
}
