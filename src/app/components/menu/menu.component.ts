import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isAuthenticated : boolean = false;
  public user : string;

  constructor(private oktaAuth : OktaAuthService) {
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

  userLogout() {
    this.oktaAuth.signOut();
  }
}
