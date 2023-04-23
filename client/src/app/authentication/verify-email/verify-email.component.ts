import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  public isLoading: boolean = false;
  public error: string | undefined = undefined;
  public isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private verificationService: VerificationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.verifyUser(params['userId'], params['verificationCode']);
      }
    });
  }

  private verifyUser(userId: string, verificationCode: number): void {
    this.isLoading = true;
    this.verificationService.verifyUser(userId, verificationCode).subscribe({
      next: response => {
        if (response.isVerified) {
          this.isVerified = true;
        }
        this.isLoading = false;
      },
      error: error => {
        switch (error.error.message) {
          case 'EMAIL_ALREADY_VERIFIED':
            this.error = 'Your email address has already been verified.'
            break;
          case 'VERIFICATION_CODE_EXPIRED':
            this.error = 'The verification code has expired.'
            break;
          case 'VERIFICATION_CODE_INVALID':
            this.error = 'The verification code is invalid.'
            break;
        }
        this.isLoading = false;
      }
    })
  }
}
