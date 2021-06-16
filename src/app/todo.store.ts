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
    getTaskViewer();
  }

  getTaskViewer(){
    
    const taskCategory=this.taskService.getBlankCategory();

    let taskCategories : TaskCategory[] =Object.entries( this.taskService.getTaskCategories()).map(e=>e[1]);

    this.updateTaskViewer({taskCategories});
     
  }

  private updateTaskViewer( taskkViewerP: Partial<TaskViewerState> ){
    this.taskViewrObservable.update({ ...this.taskViewrObservable.value, ... taskkViewerP})
  }

}