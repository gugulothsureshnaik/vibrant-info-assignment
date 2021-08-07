import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { CustomValidator } from '@app/validators/custom.validators';
import { environment } from '@environments/environment';
@Component({ templateUrl: 'user-view-details.component.html' })
export class UserViewDetailsComponent {
  loading = false;
  users: User[];
  collection = [];
  p = 1;
  id;
  newUserForm: FormGroup;
  submitted = false;
  error = '';
  isEditEnabled = false;
  user:User=null;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    
  }
 
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getSingleUser(this.id).subscribe(
      (data) => {
        this.loading = false;
        console.log('signle users' + JSON.stringify(data));
        this.user = Object(data);
      },
      (err) => {
        console.log('Error in Service' + err);
      }
    );
  }
}
