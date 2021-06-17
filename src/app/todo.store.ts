import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TaskService } from "./task.service";
import { INIT_TASKVIEWER_STATE, TaskViewerState } from "./task.state";
import { TaskCategory } from './app.model';


@Injectable({
  providedIn: 'root'
})

export class TodoStore{
  
  private taskViewrObservable = new BehaviorSubject<TaskViewerState>(INIT_TASKVIEWER_STATE);
  taskViewer$ = this.taskViewrObservable.asObservable();
  constructor(private taskService:TaskService){
    this.getTaskViewer();
  }

  getTaskViewer(){
    
    let taskCategories : TaskCategory[] = []; 
    
    
    this.taskService.getTaskCategories()
    .subscribe(tCategories => {
      Object.entries(tCategories).forEach(e=> taskCategories.push(e[1]));
    });
    
    
    
    
     console.log(taskCategories);
     /*this.taskService.getTaskCategories().subscribe(result => {
     taskCategories = result;
      console.log(taskCategories);
      
    });*/
    
    
    
    this.updateTaskViewer({taskCategories});
    
    
     
  }

  private updateTaskViewer( taskViewerP: Partial<TaskViewerState> ){
    this.taskViewrObservable.next({ ...this.taskViewrObservable.value, ... taskViewerP})
  }
  addTaskCategory(){
    
    const taskCategories = [...this.taskViewrObservable.value.taskCategories,{...this.taskViewrObservable.value.taskCategory , id:this.taskViewrObservable.value.taskCategory.id}];

    this.taskService.postTaskCategory(this.taskViewrObservable.value.taskCategory).subscribe(category => {
      
    })
  }

  saveCredentials(categoryId:string,categoryName:string){
      
  }


}