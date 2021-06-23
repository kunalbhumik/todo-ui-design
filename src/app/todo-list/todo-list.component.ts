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

  
  newTask: Task = this.taskStore.getNewTask();
  taskCategoryState: TaskCategoryState ;

  constructor(private taskStore: TodoStore) {
    this.taskCategoryState =  this.taskStore.getNewTaskCategoryState();
   
  }

  

  addTask() {
    if (this.newTask.name === '' && this.newTask.name.length > 200) {
      alert('Blank task is not permitted!!!');
    } else {
      this.taskStore.addTask(this.newTask);
    }
  }

  change(event) {
    this.taskStore.change(event);
  }

  
  ngOnChanges(changes: SimpleChanges) {
    
    this.taskCategoryState = this.taskStore.getSelectedTaskCategory(this.index);
    console.log(this.taskCategoryState);
  }


}
