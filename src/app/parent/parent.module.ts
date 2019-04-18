import { Child2Component } from './child2/child2.component';
import { Child1Component } from './child1/child1.component';
import { ParentRoutingModule } from './parent-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../employee/shared.module';
import { ParentComponent } from './parent.component';

@NgModule({
  declarations: [
    ParentComponent,
    Child1Component,
    Child2Component
  ],
  imports: [
    ParentRoutingModule,
    SharedModule
  ]
})
export class ParentModule { }
