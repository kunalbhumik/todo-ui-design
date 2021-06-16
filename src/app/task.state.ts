import { TaskCategory } from "./app.model";

export interface TaskViewerState{
  id: string;
  name: string;

  nameSearch:string;

  taskCategory:TaskCategory;

  taskCategories: TaskCategory[];


  
}

export const INIT_TASKVIEWER_STATE  = {
id : '',
name: '',
nameSearch : '',
taskCategory : {} as TaskCategory,
taskCategories : [] as TaskCategory[]
} ;