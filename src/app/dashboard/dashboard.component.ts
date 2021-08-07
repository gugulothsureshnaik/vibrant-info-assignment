import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { CustomValidator } from '@app/validators/custom.validators';
import { environment } from '@environments/environment';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
@Component({ templateUrl: 'dashboard.component.html' })
export class DashBoardComponent {
  loading = false;
  users: User[];
  collection = [];
  p = 1;
  newUserForm: FormGroup;
  submitted = false;
  error = '';
  isEditEnabled = false;
  formCloseOrOpens=false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private toastr: ToastrService,
    private authenticationService: AuthenticationService
  ) {
    for (let index = 0; index < 100; index++) {
      const element = index;
      this.collection.push(element);
    }
    this.ngOnInit();
  }
  get f() {
    return this.newUserForm.controls;
  }
  formCloseOrOpen(){
    this.formCloseOrOpens = !this.formCloseOrOpens;
  }
  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]{2,15}[a-zA-Z]*$')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]{2,15}[a-zA-Z]*$')],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_]{8,15}[a-zA-Z]+[0-9]*$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      address: [
        '',
        [Validators.required, Validators.pattern('^[#.0-9a-zA-Z s,-]+$')],
      ],
      pincode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$'),
        ],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')],
      ],
    });
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.loading = false;
        console.log('users' + JSON.stringify(data));
        this.collection = Object(data);
      },
      (err) => {
        console.log('Error in Service' + err);
      }
    );
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newUserForm.invalid) {
      return;
    }

    this.loading = true;
    let user: User = {
      id: this.f.id.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      userName: this.f.userName.value,
      email: this.f.email.value,
      address: this.f.address.value,
      pincode: this.f.pincode.value,
      phone: this.f.phone.value,
    };
    if(this.isEditEnabled==false){
      this.userService.createUser(user).subscribe(
        (data) => {
          if (Object(data).id) {
            this.toastr.success('New User Created Successfully','New User');
            this.loading = false;
            console.log('users createUser' + JSON.stringify(data));
            window.location.reload();
          }
          window.location.reload();
        },
        (err) => {
          this.toastr.error('Error while New User Creating');
          console.log('Error in Service' + err);
        }
      );
    } else{
      this.userService.updateUser(user).subscribe(
        (data) => {
          if (Object(data).id) {
            this.toastr.success('User Details are Successfully Updated');
            this.loading = false;
            console.log('users Updated' + JSON.stringify(data));
            window.location.reload();
          }
          window.location.reload();
        },
        (err) => {
          console.log('Error in Service' + err);
        }
      );
    }
  }
  
  delete(id) {
    this.loading = true;
    console.log('users delete id' + id);
    this.userService.deleteUser(id).subscribe(
      (data) => {
        if (data == '{}') {
          this.loading = false;
          console.log('users delete' + JSON.stringify(data));
          window.location.reload();
        }
        window.location.reload();
      },
      (err) => {
        console.log('Error in Service' + err);
      }
    );
  }
  isEditCancel() {
    this.isEditEnabled = false;
    this.reset();
  }
  reset() {
    this.newUserForm.reset();
    Object.keys(this.newUserForm.controls).forEach((key) => {
      this.newUserForm.controls[key].setErrors(null);
    });
  }
  edit(id) {
    this.isEditEnabled = true;
    console.log('Edit id' + id);
    this.loading = true;
    this.userService.getSingleUser(id).subscribe(
      (data) => {
        this.loading = false;
        console.log('Edit id Object' + JSON.stringify(data));
        //this.collection = Object(data);
        this.newUserForm.patchValue({
          id: Object(data).id,
          firstName: Object(data).firstName,
          lastName: Object(data).lastName,
          userName: Object(data).userName,
          email:Object(data).email,
          address: Object(data).address,
          pincode: Object(data).pincode,
          phone: Object(data).phone,
        });
      },
      (err) => {
        console.log('Error in Service' + err);
      }
    );
  }
}
