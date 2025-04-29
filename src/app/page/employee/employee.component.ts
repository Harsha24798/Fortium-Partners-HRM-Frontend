import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/EmployeeService';

@Component({
  selector: 'app-employee',
  imports: [NgFor],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  empleeList: Employee[] = [];
  
  constructor(private employeeService: EmployeeService) { }

  // loadItems() {
  //   this.employeeService.getAllEmployees().subscribe(
  //     (data: Employee[]) => this.empleeList = data, (error) => console.error('Error fetching items', error));
      
  // }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        console.log('Employees fetched successfully:', data);
        this.empleeList = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

}
