import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { BooksComponent } from './components/books/books.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthService } from '@okta/okta-angular';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginComponent },
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
    OktaAuthService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
