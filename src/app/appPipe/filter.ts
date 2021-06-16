import {Pipe,PipeTransform} from '@angular/core'

@Pipe({
  name:'filter'
})

export class FilterPipe implements PipeTransform{

  transform(value:any,searchTerm:string):any{
    
    if(value.length==0 || searchTerm.length  < 2){
      return value;
    }
    return value.filter(function(search){
      return search.name.indexOf(searchTerm) > -1
    })

    
  }
  
}