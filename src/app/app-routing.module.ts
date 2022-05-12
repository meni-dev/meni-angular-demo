import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DtDemoServersideComponent } from './dt-demo-serverside/dt-demo-serverside.component';
import { DtDemoComponent } from './dt-demo/dt-demo.component';
import { DtTableMaterialComponent } from './dt-table-material/dt-table-material.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        component: EmployeeDashboardComponent
    },
    {
        path: 'dt-demo', component: DtDemoComponent

    },
    {
        path: 'dt-demo-server', component: DtDemoServersideComponent

    },
    {
        path: 'dt-table-material', component: DtTableMaterialComponent

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }