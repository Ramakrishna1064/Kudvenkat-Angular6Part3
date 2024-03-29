import { NgModule } from '@angular/core';
import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  // If you want the components that belong to this module, available to
  // other modules, that import this module, then include all those
  // components in the exports array. Similarly you can also export the
  // imported Angular Modules
  // exports: [
  //   CreateEmployeeComponent,
  //   ReactiveFormsModule
  // ]
})
export class EmployeeModule { }
