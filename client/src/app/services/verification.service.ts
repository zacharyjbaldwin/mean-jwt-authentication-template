import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface VerifyUserDto {
  message: string | undefined;
  isVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) { }

  public verifyUser(userId: string, verificationCode: number): Observable<VerifyUserDto> {
    return this.http.post<VerifyUserDto>(`${environment.apiUrl}/verification/${userId}?verificationCode=${verificationCode}`, {});
  }
}
