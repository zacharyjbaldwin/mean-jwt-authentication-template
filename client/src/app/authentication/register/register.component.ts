import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  private subs = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.subs.add(this.authenticationService.registerError.subscribe({
      next: message => this.toastr.error(message)
    }));
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public register(): void {
    this.authenticationService.register(this.registerForm.value.email, this.registerForm.value.firstname, this.registerForm.value.lastname, this.registerForm.value.password);
  }
}
