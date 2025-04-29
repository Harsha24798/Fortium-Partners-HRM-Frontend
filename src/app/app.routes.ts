import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { DepartmentComponent } from './page/department/department.component';
import { ReportsComponent } from './page/reports/reports.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
        path: "employees",
        component: EmployeeComponent
    },
    {
        path: "departments",
        component: DepartmentComponent
    },
    {
        path: "reports",
        component: ReportsComponent
    }
];
