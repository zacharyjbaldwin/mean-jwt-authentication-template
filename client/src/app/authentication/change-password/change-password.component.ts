import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  public changePassword() {
    const userId = this.authenticationService.getUserId();
    if (userId) {
      this.authenticationService.changePassword(userId, this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword).subscribe({
        next: () => {
          this.changePasswordForm.reset();
          this.toastr.success('Changed password.');
        },
        error: () => {
          this.toastr.error('Failed to change password.');
        }
      });
    }
  }

}
