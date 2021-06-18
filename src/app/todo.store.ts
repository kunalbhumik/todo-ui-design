import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TaskService } from "./task.service";
import { INIT_TASKVIEWER_STATE, TaskViewerState } from "./task.state";
import { TaskCategory } from './app.model';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class TodoStore{
  
  private taskViewrObservable = new BehaviorSubject<TaskViewerState>(INIT_TASKVIEWER_STATE);
  taskViewer$ = this.taskViewrObservable.asObservable();
  constructor(private taskService:TaskService,private http:HttpClient){
    this.getTaskViewer();
  }

  getTaskViewer(){
    
    let taskCategories : TaskCategory[] = []; 
    
    
    /*this.taskService.getTaskCategories()
    .subscribe(tCategories => {
      Object.entries(tCategories).forEach(e=> taskCategories.push(e[1]));
    });*/

    this.http.get('https://test-ba90f-default-rtdb.firebaseio.com/categories.json')
    .pipe(
      map(responseDate=>{
        const postsArray = [];
        for(const key in responseDate){
        if(responseDate.hasOwnProperty(key)){
          taskCategories.push({...responseDate[key],id:key});
        }
        }
        return taskCategories;
      })
    )
    .subscribe(tasks => {
      console.log(taskCategories);
    })
    
    
    
    
     console.log(taskCategories);
     /*this.taskService.getTaskCategories().subscribe(result => {
     taskCategories = result;
      console.log(taskCategories);
      
    });*/
    
    
    
    this.updateTaskViewer({taskCategories});
    
    
     
  }

  public updateTaskViewer( taskViewerP: Partial<TaskViewerState> ){
    this.taskViewrObservable.next({ ...this.taskViewrObservable.value, ... taskViewerP})
  }


  addTaskCategory(){
    
   
    
    //let taskCategories = [...taskCategories,{...taskCategory , name:taskCategory.name}];

    this.taskService.postTaskCategory(this.taskViewrObservable.value.taskCategory).subscribe(category => {
      
    })
    
  }

 


}