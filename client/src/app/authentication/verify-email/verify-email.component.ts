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
  public showResendButton: boolean = false;
  private userId: string | undefined;
  public resendSuccess: boolean = false;
  public attemptedResend: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private verificationService: VerificationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.userId = params['userId'];
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
            this.showResendButton = true;
            break;
          case 'VERIFICATION_CODE_INVALID':
            this.error = 'The verification code is invalid.'
            this.showResendButton = true;
            break;
        }
        this.isLoading = false;
      }
    });
  }

  public resendVerificationDetails(): void {
    this.isLoading = true;
    this.attemptedResend = true;
    if (this.userId) {
      this.verificationService.resendVerificationDetails(this.userId).subscribe({
        next: response => {
          if (response.success) {
            this.resendSuccess = true;
            this.error = undefined;
          }
          this.isLoading = false;
        },
        error: error => {
          this.error = 'Failed to resend verification details. Please try again later.';
          this.isLoading = false;
        }
      })
    }
  }
}
