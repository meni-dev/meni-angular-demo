import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/shared/api.service';
import { EmployeeModel } from './employee-dashboard module';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();


  constructor(private formBuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Firstname: [''],
      Lastname: [''],
      EmailId: [''],
      Mobileno: [''],
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
      },

        err => {
          alert("Something went wrong")
        })

  }
}
