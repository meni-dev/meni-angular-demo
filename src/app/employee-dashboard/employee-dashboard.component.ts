import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/shared/api.service';
import { EmployeeModel } from './employee-dashboard module';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  isSuccessAdd: boolean = false;
  isSuccessUpdate: boolean = false;

  // if anything changes
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {

    let that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      autoWidth: false,
      ajax: function (data, callback) {
        that.getAllemployee().subscribe((res: any) => {
          console.log(res)
          that.employeeData = res;
          callback({
            recordsTotal: res.length,
            recordsFiltered: 2,
            data: []
          });
        })

      }
    };

    this.formValue = this.formBuilder.group({
      Firstname: [''],
      Lastname: [''],
      EmailId: [''],
      Mobilenumber: [''],
      Salary: ['']
    })
  }



  postEmployeeDetails() {

    console.log(this.formValue.value.Firstname + " fn")
    this.employeeModelObj.Firstname = this.formValue.value.Firstname;
    this.employeeModelObj.Lastname = this.formValue.value.Lastname;
    this.employeeModelObj.EmailId = this.formValue.value.EmailId;
    this.employeeModelObj.Mobilenumber = this.formValue.value.Mobilenumber;
    this.employeeModelObj.Salary = this.formValue.value.Salary;
    this.api.postemployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee added successfully")
        this.formValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click();

        this.getAllemployee();
      },

        err => {
          alert("Something went wrong")
        })

  }
  getAllemployee(): Observable<any> {
    return this.api.getemployee().pipe(map((res: any) => {
      return res;
    }))
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllemployee();
    })
  }
  onEdit(row: any) {
    this.isSuccessAdd = false;
    this.isSuccessUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['Firstname'].setValue(row.Firstname);
    this.formValue.controls['Lastname'].setValue(row.Lastname);
    this.formValue.controls['EmailId'].setValue(row.EmailId);
    this.formValue.controls['Mobilenumber'].setValue(row.Mobilenumber);
    this.formValue.controls['Salary'].setValue(row.Salary);
  }
  updateEmployeeDetails() {

    this.employeeModelObj.Firstname = this.formValue.value.Firstname;
    this.employeeModelObj.Lastname = this.formValue.value.Lastname;
    this.employeeModelObj.EmailId = this.formValue.value.EmailId;
    this.employeeModelObj.Mobilenumber = this.formValue.value.Mobilenumber;
    this.employeeModelObj.Salary = this.formValue.value.Salary;
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("Updated successfully")
      this.formValue.reset();
      let ref = document.getElementById('cancel');
      ref?.click();
      this.getAllemployee();
    })

  }

  showAddButton() {
    this.isSuccessAdd = true;
    this.isSuccessUpdate = false;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }


  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(this.employeeData);
  //   console.log(this.datatableElement.dtInstance)

  //   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.columns().every(function () {
  //       const that = this;

  //       $('input', this.footer()).on('keyup change', function ($event) {
  //         debugger;
  //         console.log((<HTMLInputElement>$event.target).value)
  //         console.log(that);

  //         var text = (<HTMLInputElement>$event.target).value;
  //         if (that.search() !== text) {
  //           that
  //             .search(text)
  //             .draw();
  //         }
  //       });
  //     });
  //   });
  // }
}
