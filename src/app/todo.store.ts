import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TaskService } from "./task.service";
import { INIT_TASKVIEWER_STATE, TaskViewerState } from "./task.state";

@Injectable({
  providedIn: 'root'
})

export class TodoStore{
  taskViewrObservable = new BehaviorSubject<TaskViewerState>(INIT_TASKVIEWER_STATE);
  constructor(private taskService:TaskService){}


}