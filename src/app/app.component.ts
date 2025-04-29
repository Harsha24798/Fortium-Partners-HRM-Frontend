import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./page/navbar/navbar.component";
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { Employee } from './model/Employee';
import { EmployeeService } from './services/EmployeeService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'fortium-partner-frontend';

  ngOnInit(): void {
    initFlowbite();
  }

  
  

  
}
