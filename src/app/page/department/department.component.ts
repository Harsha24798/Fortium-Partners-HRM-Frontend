import { Component } from '@angular/core';
import { Department } from '../../model/department';
import { DepartmentService } from '../../services/DepartmentService';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [NgFor],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

  departmentList: Department[] = [];
    
    constructor(private departmentService: DepartmentService) { }
  
    ngOnInit() {
      this.loadItems();
    }
  
    loadItems() {
      this.departmentService.getAllDepartments().subscribe(
        (data: Department[]) => {
          console.log('Employees fetched successfully:', data);
          this.departmentList = data;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
    }
}
