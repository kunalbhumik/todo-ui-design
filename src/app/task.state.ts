import { TaskCategory } from "./app.model";
import { MenuElement, Task } from '../app.model';

export interface TaskViewerState{
  taskCategoryName:string;
  taskCategory:TaskCategory;
  taskCategories: TaskCategory[];


  @ViewChild('taskName') inputName;
  
  @Input()
  categoryId: string;

  @Input()
  categoryName: string;

  taskList:Task[];

  menus:MenuElement[];

  task: Task ;

  name:string;

  status:boolean;
}

export const INIT_TASKVIEWER_STATE  = {
  taskCategoryName: '',
  taskCategory : {} as TaskCategory,
  taskCategories : [] as TaskCategory[]
  

  
};