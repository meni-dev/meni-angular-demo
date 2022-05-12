import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

class Person {
  id!: number;
  Firstname!: string;
  Lastname!: string
}

class DataTablesResponse {
  data!: any[];
  draw!: number;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  selector: 'app-server-side-angular-way',
  templateUrl: 'dt-demo-serverside.component.html',
  styleUrls: ['dt-demo-serverside.component.css']
})
export class DtDemoServersideComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons!: Person[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {

        // that.http
        //   .post<DataTablesResponse>(
        //     'https://angular-datatables-demo-server.herokuapp.com/', dataTablesParameters
        //   ).subscribe(resp => {
        //     //that.persons = resp;

        //     callback({
        //       recordsTotal: resp.recordsTotal,
        //       recordsFiltered: resp.recordsFiltered,
        //       data: resp.data
        //     });
        //   });




        that.http
          .get<Person[]>(
            'http://localhost:3000/posts', dataTablesParameters
          ).subscribe(resp => {

            callback({
              recordsTotal: 6,
              recordsFiltered: 6,
              data: resp
            });
          });

      },
      // columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
      columns: [{ data: 'id' }, { data: 'Firstname' }, { data: 'Lastname' }]
    };
  }
}