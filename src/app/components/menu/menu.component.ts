import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isAuthenticated : boolean = false;
  public user : string;

  constructor(private oktaAuth : OktaAuthService, private router : Router) {
  }

  async ngOnInit() {
    this.oktaAuth.$authenticationState.subscribe(
      async data => {
        this.isAuthenticated = data;
        if(data) {
          const userClaim = await this.oktaAuth.getUser();
          this.user = userClaim.name;
        }
      }
    );
  }

  userLogin() {
    this.router.navigateByUrl("/login");
  }

  userLogout() {
    this.oktaAuth.signOut();
  }

  doSearch(name : string) {
    this.router.navigateByUrl(`/search/${name}`);
  }
}
