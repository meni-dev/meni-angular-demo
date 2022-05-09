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
  employeeData!: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Firstname: [''],
      Lastname: [''],
      EmailId: [''],
      Mobilenumber: [''],
      Salary: ['']
    })
    this.getAllemployee();
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
  getAllemployee() {
    this.api.getemployee().subscribe(res => {
      this.employeeData = res;
    })
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllemployee();
    })
  }
  onEdit(row: any) {
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
}
