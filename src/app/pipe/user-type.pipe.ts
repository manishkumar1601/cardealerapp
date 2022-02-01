import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: string): string {
    if(value === 'admin'){
      value = 'ADMINISTRATOR';
    }
    return value;
  }

}
