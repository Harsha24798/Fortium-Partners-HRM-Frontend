import { Component } from '@angular/core';
import { Department } from '../../model/department';
import { DepartmentService } from '../../services/DepartmentService';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [NgFor, NgSwitch, NgSwitchCase, FormsModule, NgIf],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

  departmentList: Department[] = [];

  selectedDepartment: Department | null = null;
    modalType: 'view' | 'edit' | 'delete' | null = null;
    
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

    openModal(type: 'view' | 'edit' | 'delete', selectedDepartment: Department) {
        if (!selectedDepartment.id) {
          console.error('Employee ID is required');
          return;
        }
        this.modalType = type;
        this.selectedDepartment = { ...selectedDepartment };
      }
    
      closeModal() {
        this.modalType = null;
        this.selectedDepartment = null;
      }

      saveEdit() {
          if (!this.selectedDepartment || !this.selectedDepartment.id) {
            console.error('No employee selected or missing ID');
            return;
          }
        
          this.departmentService.updateDepartment(this.selectedDepartment.id, this.selectedDepartment).subscribe(
            () => {
              Swal.fire('Updated!', 'Employee details have been updated.', 'success');
              this.loadItems(); // refresh the list
              this.closeModal();
            },
            (error) => {
              console.error('Error updating employee:', error);
              Swal.fire('Error', 'Failed to update employee.', 'error');
            }
          );
        }
      
        
        confirmDelete(id: number) {
          this.departmentService.deleteDepartment(id).subscribe(
            () => {
              Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
              this.loadItems(); // refresh the list
              this.closeModal();
            },
            (error) => {
              console.error('Error deleting employee:', error);
              Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
              this.loadItems(); // refresh the list
              this.closeModal();
            }
          );
        }
}
