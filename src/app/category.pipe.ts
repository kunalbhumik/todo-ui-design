import { Pipe, PipeTransform } from '@angular/core';
import { TaskCategory } from './app.model';

@Pipe({
    name: 'prop',
    pure: false
})
export class CategoryFilterPipe implements PipeTransform {
    transform(items: TaskCategory[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.type === filter);
    }
}