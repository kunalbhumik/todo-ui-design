import { Component, ViewChild } from '@angular/core';
import { TaskService } from './task.service';
import { TaskCategory } from './app.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id: string = null;
  name: string = null;

  nameSearch:string = "";

  taskCategory:TaskCategory;

  taskCategories: TaskCategory[] = [];

  

  constructor(private taskService: TaskService , private http:HttpClient) {}

  ngOnInit() {
    /*this.taskService.getTaskCategories().subscribe(result => {
      this.taskCategories = result;
    });   */

    this.http.get('https://test-ba90f-default-rtdb.firebaseio.com/categories.json')
    .pipe(
      map(responseData=>{
        
        for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          this.taskCategories.push({...responseData[key],id:key});
        }
        }
        return this.taskCategories;
      })
    )
    .subscribe(categories => {
      console.log(this.taskCategories);
    })
    this.taskCategory=this.taskService.getBlankCategory();

    


    this.saveCredentials(this.taskCategories[0].id,this.taskCategories[0].name);
    

  }

  addTaskCategory(){

    this.taskCategories = [...this.taskCategories,{...this.taskCategory , id:this.id}];

    this.taskService.postTaskCategory(this.taskCategory).subscribe(category => {
      
    })

    

    
    
  }

  saveCredentials(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
