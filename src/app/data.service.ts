import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {

  findSchemas(search: string): Observable<any[]> {
    return Observable.create(e => {
      e.next([
        'schema-1',
        'schema-2',
        'schema-3',
        'schema-4',
        'schema-5'
      ]);
    });
  }

  findTables(schema: string, search: string): Observable<any[]> {
    return Observable.create(e => {
      e.next([
        'table-1',
        'table-2',
        'table-3',
        'table-4',
        'table-5'
      ]);
    });
  }

  findColumns(schema: string, table: string, search: string): Observable<any[]> {
    return Observable.create(e => {
      e.next([
        'column-1',
        'column-2',
        'column-3',
        'column-4',
        'column-5'
      ]);
    });
  }
}
