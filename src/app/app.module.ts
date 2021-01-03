import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { BooksComponent } from './components/books/books.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import oktaConfig from '../app/common/oktaConfig';
import { OKTA_CONFIG,
         OktaAuthModule,
         OktaCallbackComponent
      } from '@okta/okta-angular';

const oktaCfg = Object.assign({
  onAuthRequired : (injector) => {
    const router = injector.get(Router);
    router.navigate(['/login'])
  }
}, oktaConfig.oidc)

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books/:id', component: BooksComponent },
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    CategoriesComponent,
    BestSellerComponent,
    BooksComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [{provide : OKTA_CONFIG, useValue : oktaCfg}],
  bootstrap: [AppComponent]
})
export class AppModule { }
