import {Pipe,PipeTransform} from '@angular/core'
import { TaskCategory } from '../app.model';

@Pipe({
  name:'filter'
})

export class FilterPipe implements PipeTransform{

  
    transform(items: TaskCategory[], filter: string): any {
        return items.filter(function(search){
          return search.name.indexOf(filter) > -1;
        })
        
       // return items.filter(item =>item.name && item.name.indexOf(filter) > -1  );
    }
}