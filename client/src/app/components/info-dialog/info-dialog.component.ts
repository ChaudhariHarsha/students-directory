import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Students } from '../../app.interface';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  @Input() readOnlyDrawer = false;
  @ViewChild('drawer') public drawer!: MatSidenav;
  isDrawerOpen!: boolean;
  @Input() drawerSize: 'small' | 'medium' | 'large' | 'extra-large' = 'medium';
  @Output() backdropClicked = new EventEmitter<void>();
  @Output() drawerClose = new EventEmitter<Students>();
  isEditable=false
  studentForm!: FormGroup;
  private snackBar = inject(MatSnackBar);
  studentId!:number

  constructor(private changeDetector: ChangeDetectorRef, private fb: FormBuilder,) {
    this.initializeForm()
  }

  ngOnChanges() {
    if (this.drawer) {
      this.isDrawerOpen = this.drawer.opened;
    }
  }

  initializeForm(){
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      standard: ['', [Validators.required]],
    });
  }

  public open(student?: Students) {
    this.isEditable=false
    this.drawer.open();
    this.isDrawerOpen = true;
    this.initializeForm()
    this.studentId=0
    if(student){
      this.studentId= student.studentId
      this.studentForm.patchValue(student);
      this.isEditable=true
    }
  }

  public close() {
    this.drawer.close();
    this.isDrawerOpen = false;
  }

  onBackdropClicked() {
      this.close();
      this.isDrawerOpen = false;
  }

  isDrawerOpened() {
    this.changeDetector.detectChanges();
    return this.drawer.opened;
  }

  onDoneClick(){
    if(this.studentForm.valid){
      const value=this.studentForm.value;
      if(this.studentId){
        Object.assign(value,{studentId:this.studentId})
      }
      this.drawerClose.emit(this.studentForm.value)
      this.close()
    }else{
      this.studentForm.markAllAsTouched()
      this.snackBar.open('* please fill the all required fields',undefined,{duration:2000});
    }   
  }
}
