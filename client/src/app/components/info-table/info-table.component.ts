import { Component, inject, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ELEMENT_DATA } from '../../app.constants';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Students } from '../../app.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrl: './info-table.component.scss'
})
export class InfoTableComponent {
  displayedColumns: string[] = ['studentId','name','lastName','gender' ,'email','dob','standard','action' ];
  tableData=ELEMENT_DATA
  dataSource = new MatTableDataSource(this.tableData);
  private snackBar = inject(MatSnackBar);
  
  @ViewChild(InfoDialogComponent) drawer!: InfoDialogComponent
  openDrawer(student?:Students) {
    this.drawer.open(student)
  }

  onDrawerClose(student:Students){
    if(student.studentId){
     this.tableData= this.tableData.map(d=>{
        if(d.studentId===student.studentId){
          d=student
        }
        return d
      })
      this.snackBar.open('Student Edited',undefined,{duration:2000});
    }else{
      student.studentId=Math.max(...this.tableData.map(d=>d.studentId))+1
      this.tableData.push(student)
      this.snackBar.open('Student Inserted',undefined,{duration:2000});
    }
    this.dataSource= new MatTableDataSource(this.tableData)

  }

  onDelete(studentId:number){
    if (confirm("Are you sure, want to delete?")) {
      this.tableData= this.tableData.filter(d=>d.studentId!=studentId);
    this.dataSource= new MatTableDataSource(this.tableData)
    this.snackBar.open('Student Deleted',undefined,{duration:2000});
    }
    
  }
}
