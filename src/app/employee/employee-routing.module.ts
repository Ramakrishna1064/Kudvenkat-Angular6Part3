import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [

  //We can us below any one them
  //SENAREO 1
  {
    path: '',
    children: [
      { path: '', component: ListEmployeesComponent },
      { path: 'create', component: CreateEmployeeComponent },
      { path: 'edit/:id', component: CreateEmployeeComponent }
    ]
  }

  //SENAREO 2
  // { path: '', component: ListEmployeesComponent },
  // { path: 'create', component: CreateEmployeeComponent },
  // { path: 'edit/:id', component: CreateEmployeeComponent }
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
