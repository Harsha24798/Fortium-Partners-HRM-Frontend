import { Component } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/EmployeeService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employeeList: Employee[] = [];

  selectedEmployee: Employee | null = null;
  modalType: 'view' | 'edit' | 'delete' | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employeeList = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  openModal(type: 'view' | 'edit' | 'delete', selectedEmployee: Employee) {
    if (!selectedEmployee.id) {
      console.error('Employee ID is required');
      return;
    }
    this.modalType = type;
    this.selectedEmployee = { ...selectedEmployee };
  }

  closeModal() {
    this.modalType = null;
    this.selectedEmployee = null;
  }

  saveEdit() {
    if (!this.selectedEmployee || !this.selectedEmployee.id) {
      console.error('No employee selected or missing ID');
      return;
    }
  
    this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee).subscribe(
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
    this.employeeService.deleteEmployee(id).subscribe(
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
