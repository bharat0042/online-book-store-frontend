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
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { NgxPaginationModule } from 'ngx-pagination';

const oktaCfg = Object.assign({
  onAuthRequired : (injector) => {
    const router = injector.get(Router);
    router.navigate(['/login'])
  }
}, oktaConfig.oidc)

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'cart-list', component: CartListComponent },
  { path: 'book-details/:book-id', component: BookDetailsComponent },
  { path: 'search/:name', component: BooksComponent },
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
    LoginComponent,
    BookDetailsComponent,
    CartListComponent,
    CheckoutFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    OktaAuthModule,
    NgxPaginationModule
  ],
  providers: [{provide : OKTA_CONFIG, useValue : oktaCfg}],
  bootstrap: [AppComponent]
})
export class AppModule { }
