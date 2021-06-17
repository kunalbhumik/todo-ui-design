import { TaskCategory } from "./app.model";
import { MenuElement, Task } from '../app.model';

export interface TaskViewerState{
  taskCategoryName:string;
  taskCategory:TaskCategory;
  taskCategories: TaskCategory[];
}

export const INIT_TASKVIEWER_STATE  = {
  taskCategoryName: '',
  taskCategory : {} as TaskCategory,
  taskCategories : [] as TaskCategory[]

  
};