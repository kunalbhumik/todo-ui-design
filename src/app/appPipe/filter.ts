import {Pipe,PipeTransform} from '@angular/core'
import { TaskCategory } from '../app.model';
import { TaskCategoryState } from '../task.state';

@Pipe({
  name:'filter'
})

export class FilterPipe implements PipeTransform{

  
    transform(items:TaskCategoryState, filter: any): any {
        // return items.filter(function(search){
        //   return search.name.indexOf(filter) > -1;
        // })
        console.log(items);
        return items.filter(item =>item.taskCategory.name && item.taskCategory.name.indexOf(filter) > -1  );
    }
}