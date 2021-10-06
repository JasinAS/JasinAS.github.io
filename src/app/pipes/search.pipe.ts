import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, searchValue?: string): any {
    if (!value) {
      return null;
    }
    if (!searchValue) {
      return value;
    }

    searchValue = searchValue.toLowerCase();

    return value.filter((data) => {
      // Search for first and last name together and search for the first & last name in that order or vise versa
      const firstLastName = data.firstName + ' ' + data.lastName;
      const lastFirstName = data.lastName + ' ' + data.firstName;
      return (
        JSON.stringify(firstLastName).toLowerCase().includes(searchValue) ||
        JSON.stringify(lastFirstName).toLowerCase().includes(searchValue)
      );
    });
  }
}
