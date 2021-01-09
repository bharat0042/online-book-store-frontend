import { Component, OnInit } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuthService } from '@okta/okta-angular';
import oktaConfig from '../../common/oktaConfig';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn: any;

  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit(): void {
    this.signIn = new OktaSignIn({
      baseUrl: oktaConfig.oidc.issuer.split('/oauth2')[0],
      clientId: oktaConfig.oidc.clientId,
      redirectUri: oktaConfig.oidc.redirectUri,
      logo: '/assets/logo.png',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to biggest online book store',
        },
      },
      authParams: {
        issuer: oktaConfig.oidc.issuer
      }
    });

    this.signIn.renderEl({
      el: '#sign-in-widget',
      pkce : true,
      scopes: oktaConfig.oidc.scopes
    },
    (result) => {
      if(result.status == "SUCCESS") {
        this.oktaAuth.signInWithRedirect();
      }
    });
  }

}
