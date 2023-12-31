import { Component, OnInit, ViewChild, inject , AfterViewInit, OnChanges} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfoComponent } from './dialog-confo/dialog-confo.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
reset() {
throw new Error('Method not implemented.');
}
  title = 'oia_con';

  showDropdownContent: boolean = false;

  toggleDropdown() {
    this.showDropdownContent = !this.showDropdownContent;
  }

  isDrawerOpened = true;
  XsScreen = false;

  rightDrawer = false;

  maxDates=new Date();

  userForm!: FormGroup;
  isEditMode: boolean = false;
  editedUserId: number | null = null;

  user: any; // for the image


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  constructor(private breakpointObserver: BreakpointObserver,private fb: FormBuilder,private _snackBar: MatSnackBar ,private dialog: MatDialog  ) {
    
    //  this.ngOnChanges();
  }

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }


  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
 
  this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
    const value = data[column]?.toString().toLowerCase(); 
    return value.includes(filter);
  };
 
  this.dataSource.filter = filterValue;
 
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
  }
  /**************** xs menu icon visibility ******************************/
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.XsScreen = result.matches;
        // If it's an extra small screen, close the drawer
        if (this.XsScreen) {
          this.isDrawerOpened = false;
        }
      });

    this.initializeForm();

    const defaultUser = {
      id: 1,
      firstName: 'shakir',
      lastName: 'ahamed',
      email: 'shakir@gmail.com',
      dob: '2002-02-12',
      gender: 'Male',
      files: '',
      image: '',
    };

    this.dataSource.data = [defaultUser];

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // snackBarRef!= inject(MatSnackBarRef);
  }


  /**************** xs menu icon visibility Endss! ******************************/

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('rightDraw') rightDraw!: MatDrawer;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'files',
    'action',
  ];

//  applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }

  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      files: [''],
      image: [''],
      
    });
  }

  get form() {
    return this.userForm.controls;
  }

  

  addUser(formData: any): void {
    if (this.userForm.valid) {
      const currentData = this.dataSource.data;
  
      if (this.isEditMode) {
        const editedUserIndex = currentData.findIndex(
          (user) => user.id === this.editedUserId
        );
  
        if (editedUserIndex !== -1) {
          const editedUser = currentData[editedUserIndex];
          editedUser.firstName = formData.firstName;
          editedUser.lastName = formData.lastName;
          editedUser.email = formData.email;
          editedUser.dob = formData.dob;
          editedUser.gender = formData.gender;
          editedUser.files = formData.files;
  
          // Update the image if a new file is selected
          if (formData.files) {
            this.displayImage(formData.files, editedUser);
            this.userForm.reset();
          }
  
          this.dataSource.data = currentData.slice();
  
          this.userForm.reset();
          this.isEditMode = false;
          this.editedUserId = null;
        }
      } else {
        const newUserId = currentData.length + 1;
  
        const newUser = {
          id: newUserId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          gender: formData.gender,
          files: formData.files,
          image: '',
        };
  
        currentData.push(newUser);
        this.dataSource.data = currentData.slice();
  
        // Display the image if a new file is selected
        if (formData.files) {
          this.displayImage(formData.files, newUser);
          this.userForm.reset();
        }
  
        this.userForm.reset();
        this.openSnackBar();
      }
    }
  }

  editUser(user: any): void {
    this.isEditMode = true;
    this.editedUserId = user.id;
  
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      files: user.files,
      image: '',
    });
  
    this.rightDrawer = true;
    this.toggleRightDrawer();
  }

  deleteUser(user: any): void {
    const index = this.dataSource.data.indexOf(user);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data.slice();
    }
  }


  openSnackBar() {
    this._snackBar.open(' Form Successfully added ', 'Close', {
      duration: 3000,
      verticalPosition: 'top' ,
      panelClass:['snackbar']
      
    });
  }

  toggleRightDrawer(): void {
    this.rightDraw.toggle();
  }

    // close (X) functionality 
  opendialog(): void {
    this.rightDrawer = false;

    if (this.userForm.dirty) {
      // dirty,? show confirmation dialog
      const dialogRef = this.dialog.open(DialogConfoComponent, {
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          //  close drawer while click yes
          this.closeDialog();
          // this.toggleRightDrawer()
        }
      });
    } else {
      //not saved, close the drawer directly
      this.closeDialog();
      
    }
  }
  
  closeDialog(): void {
    this.userForm.reset(); 
    this.rightDrawer = false;

    this.toggleRightDrawer()
}

// upload file
fileSelect(event: any, user: any): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.userForm.get('files')?.setValue(file);
    this.displayImage(file, user); 
  }
}

// selectedImage: any; 

displayImage(file: File, user: any): void {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.image = e.target?.result; 
    };

    reader.readAsDataURL(file);
  }
}



}

