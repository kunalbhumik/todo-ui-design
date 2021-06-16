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
  constructor(private taskService:TaskService){}

  getTaskViewer(){
    
    const taskCategory=this.taskService.getBlankCategory();

    let taskCategories : TaskCategory[] =[]
    


    
    this.taskService.getTaskCategories()
    .pipe(
      map(responseData=>{
        
        for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          taskCategories.push({...responseData[key],id:key});
        }
        }
        return taskCategories;
      })
    )
    .subscribe(categories => {
      console.log(taskCategories);
    })
    

  }

  }

}