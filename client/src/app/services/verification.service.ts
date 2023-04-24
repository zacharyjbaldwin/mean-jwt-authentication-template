import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface VerifyUserDto {
  message: string | undefined;
  isVerified: boolean;
}

interface ResendVerificationDetailsDto {
  message: string,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) { }

  public verifyUser(userId: string, verificationCode: number): Observable<VerifyUserDto> {
    return this.http.post<VerifyUserDto>(`${environment.apiUrl}/verification/${userId}?verificationCode=${verificationCode}`, {});
  }

  public resendVerificationDetails(userId: string): Observable<ResendVerificationDetailsDto> {
    return this.http.post<ResendVerificationDetailsDto>(`${environment.apiUrl}/verification/resend/${userId}`, {});
  }
}
