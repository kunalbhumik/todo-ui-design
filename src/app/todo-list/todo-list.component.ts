import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  Inject,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuElement, Task } from '../app.model';
import { TaskService } from '../task.service';
import { Init_Task, TaskCategoryState } from '../task.state';
import { TodoStore } from '../todo.store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnChanges {
  @Input() 
  index : number = 0;

  selectedTask : Task;
  newTask: Task = this.taskStore.getNewTask();
  taskCategoryState: TaskCategoryState ;

  constructor(private taskStore: TodoStore) {
    this.taskCategoryState =  this.taskStore.getNewTaskCategoryState();
   
  }

  

  addTask() {
    if (this.newTask.name === '') {
      alert('Blank task is not permitted!!!');
    } else {
      this.taskStore.addTask(this.newTask);
      this.newTask = { ...Init_Task };
    }
  }

  // toggleTaskStatus(event) {
   
  //  let task : Task = event.option.value;
  //  console.log(task);
  //  this.taskCategoryState.tasks.forEach(item =>{
  //    if(task.name == item.name){
  //      item.status = !item.status;
  //    }
  //  })
  //  task = null;
  //  let index = this.taskCategoryState.tasks.indexOf(task);
  //  this.taskCategoryState.tasks.splice(index,1);
  // }

  toggleTaskStatus(event) {
   
   let task : Task = event.option.value;
   let index = this.taskCategoryState.tasks.indexOf(task);
   this.taskCategoryState.tasks.splice(index,1);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    
    this.taskCategoryState = this.taskStore.getSelectedTaskCategory(this.index);
   
  }


}
