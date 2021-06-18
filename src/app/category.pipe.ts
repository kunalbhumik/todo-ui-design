import { Pipe, PipeTransform } from '@angular/core';
import { TaskCategory } from './app.model';
import { TaskCategoryState } from './task.state';

@Pipe({
    name: 'prop',
    pure: false
})
export class CategoryFilterPipe implements PipeTransform {
    transform(items: TaskCategoryState[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.taskCategory.type === filter);
    }
}