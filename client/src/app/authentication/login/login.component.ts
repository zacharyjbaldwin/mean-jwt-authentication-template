import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  private subs = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.subs.add(this.authenticationService.loginError.subscribe({
      next: message => this.toastr.error(message)
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public login(): void {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password, '/profile');
  }
}
