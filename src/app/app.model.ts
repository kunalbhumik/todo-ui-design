export interface Task{
  categoryId:string;
  name:string;
  userId:string;
  priorityId:string;
  assignedId:string;
  status:boolean;
 
}



export interface TaskCategory{
  id:string;
  name:string;
  type:string;
  icon :{name:string,color:string};
}


export interface MenuElement{
  name:string;
  icon:string;
}


