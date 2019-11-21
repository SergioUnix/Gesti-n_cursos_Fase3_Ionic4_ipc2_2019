import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticket'
})
export class TicketPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
