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
       this.updateTaskViewer({taskCategoryState :taskCategoryStates, loader: false, index: 0 });
    });
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
     
       
       this.updateTaskViewer({taskCategoryState : categories}); 
    });
    
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

  deleteCategory(taskCategoryState : TaskCategoryState){
   let  taskCategoryStates : TaskCategoryState[] = [];
   taskCategoryStates = [...this.taskViewrObservable.getValue().taskCategoryState];
   console.log(taskCategoryStates);
   let index = taskCategoryStates.indexOf(taskCategoryState);
   console.log(index);

   //this.taskCategoryState.tasks.splice(index,1);
   taskCategoryStates.splice(index,1);
   console.log(taskCategoryStates);
   this.updateTaskViewer({taskCategoryState :taskCategoryStates})
  }
  
 
}
