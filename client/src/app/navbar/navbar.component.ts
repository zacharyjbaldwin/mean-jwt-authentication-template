import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isAdmin: boolean = false;
  public isAuthenticated: boolean = false;
  private subs = new Subscription();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.subs.add(this.authenticationService.authenticationStatus.subscribe({
      next: authenticated => {
        this.isAuthenticated = authenticated;
        this.isAdmin = this.authenticationService.getRole() === "admin";
      }
    }));
    this.authenticationService.autoLogin();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public logout(): void {
    this.authenticationService.logout();
  }

}
