import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-dt-demo',
  templateUrl: './dt-demo.component.html',
  styleUrls: ['./dt-demo.component.css']
})
export class DtDemoComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  ngAfterViewInit(): void {
    console.log('obj' + this.datatableElement.dtInstance)
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;

        $('input', this.footer()).on('keyup change', function ($event) {
          console.log((<HTMLInputElement>$event.target).value)

          var text = (<HTMLInputElement>$event.target).value;
          if (that.search() !== text) {
            that
              .search(text)
              .draw();
          }
        });
      });
    });
  }

}
