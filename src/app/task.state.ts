import { MenuElement, TaskCategory, Task } from './app.model';

export interface TaskViewerState {
  taskCategoryName: string;
  index: number;
  taskCategoryState: TaskCategoryState[];
  loader: boolean;
}

export interface TaskCategoryState {
  taskCategory: TaskCategory;
  tasks: Task[];
  menus: MenuElement[];
  task: Task;
  status: boolean;
  loader: boolean;
}

export const INIT_TASKVIEWER_STATE = {
  taskCategoryName: '',
  index: -1,
  taskCategoryState: [] as TaskCategoryState[],
  loader : true,
};

export const INIT_TASKCATEGORY_STATE = {
  taskCategory:{} as TaskCategory,
  tasks: [] as Task[],
  menus: [] as MenuElement[],
  task: {} as Task,
  status: false,
  loader: true,
};

export const Init_Task = {
  categoryId: null,
  name: null,
  userId: null,
  priorityId: null,
  assignedId: null,
  status: true
};

export const Init_Category = {
  id: null,
  name: null,
  type: 'C',
  icon: {
    name: 'padding',
    color: 'gray'
  }
};
