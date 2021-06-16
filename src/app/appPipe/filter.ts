import {Pipe,PipeTransform} from '@angular/core'
import { TaskCategory } from '../app.model';

@Pipe({
  name:'filter'
})

export class FilterPipe implements PipeTransform{

  
    transform(items: TaskCategory[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.name.indexOf(filter) > -1 );
    }
}