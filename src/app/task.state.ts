import { MenuElement, TaskCategory,Task } from "./app.model";


export interface TaskViewerState{
  taskCategoryName:string;
  taskCategory:TaskCategory;
  taskCategories: TaskCategory[];


  categoryId: string;
  categoryName: string;
  taskList:Task[];
  menus:MenuElement[];
  task: Task ;
}

export const INIT_TASKVIEWER_STATE  = {
  taskCategoryName: '',
  taskCategory : {} as TaskCategory,
  taskCategories : [] as TaskCategory[],
  

  
  @Input()
  categoryId: '';

  @Input()
  categoryName: '',

  taskList:[] as Task[]

  menus:[] as MenuElement[],

  task:{} as Task,

  

  status:boolean;
   
  
};
 export const InitBlankTask = {
    
      categoryId: null,
      name: null,
      userId: null,
      priorityId: null,
      assignedId: null,
      status:true
    
  };

  export const InitBlankCategory = {

 
      
        id:null,
        name:null,
        type:"C",
        icon:{
          name:"padding",
          color:"gray"
        }
      

      
  };
  


