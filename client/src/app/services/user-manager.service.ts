import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/user-manager`);
  }

  public updateUser(userId: string, body: any): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/user-manager/${userId}`, body);
  }

  public deleteUser(userId: string) {
    return this.http.delete(`${environment.apiUrl}/user-manager/${userId}`);
  }
}
