import {Pipe,PipeTransform} from '@angular/core'
import { TaskCategory } from '../app.model';
import { TaskCategoryState } from '../task.state';

@Pipe({
  name:'filter'
})

export class FilterPipe implements PipeTransform{

  
    transform(items:TaskCategoryState, searchTerm: any): any {
        // return items.filter(function(search){
        //   return search.name.indexOf(filter) > -1;
        // })
        
        return items.filter(item =>item.taskCategory.name && item.taskCategory.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1  );
    }
}