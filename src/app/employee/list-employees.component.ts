import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { IEmployee } from '../model/IEmployee ';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: IEmployee[];

  constructor(private _employeeService: EmployeeService,private route:Router) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe(
      (employeeList) => {
        this.employees = employeeList
      },
      (err) => {
        console.log(err)
      });
  }

  /**
   * editButtonClick
   * @param employeeId 
   */
  editButtonClick(employeeId:number):void{
    this.route.navigate(['/employee/edit',employeeId]);
  }
}
