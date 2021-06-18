import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Inject, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuElement, Task } from '../app.model';
import { TaskService } from '../task.service';




@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @ViewChild('taskName') inputName;
  
  @Input()
  categoryId: string;

  @Input()
  categoryName: string;

  taskList:Task[]=[];

  menus:MenuElement[]=[];

  task: Task ;

  

  status:boolean;
   

  

  constructor(private taskService:TaskService,private http:HttpClient){}


  
  
  
  ngOnInit() {
    /*this.taskService.getTaskList().subscribe(result=>{
      this.taskList = result;
      console.log(this.taskList[8].categoryId);
      console.log(this.taskList[9].name);
      console.log(result);
      
    })*/

    this.http.get('https://test-ba90f-default-rtdb.firebaseio.com/tasks.json')
    .pipe(
      map(responseDate=>{
        const postsArray = [];
        for(const key in responseDate){
        if(responseDate.hasOwnProperty(key)){
          this.taskList.push({...responseDate[key],id:key});
        }
        }
        return this.taskList;
      })
    )
    .subscribe(tasks => {
      console.log(this.taskList);
    })

    this.task = this.taskService.getBlankTask();
    
    this.taskService.getMenuList().subscribe(menus=>{
      this.menus= menus;
     
    })

    
  }

  addTask(){
    console.log("category id",this.categoryId)
   
     this.task.categoryId = this.categoryId ;
      this.taskList = [...this.taskList, {...this.task, categoryId : this.categoryId}];
      
      console.log(this.taskList);

     
      

      this.taskService.postTask(this.task).subscribe(result=>{
        console.log(result);
      });
      this.inputName.nativeElement.value = ' ';
    }

   
    


  change(event){
   this.taskList.forEach(item => {
     if(item.name === event.option.value){
       item.status = !item.status;
     }
   });
  }
}
