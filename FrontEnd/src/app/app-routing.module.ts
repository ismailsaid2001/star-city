import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesCardComponent } from './annonces/annonces-card/annonces-card.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { AddAnnonceComponent } from './annonces/add-annonce/add-annonce.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
//import { ResetPasswordConfirmationComponent } from './auth/reset-password-confirmation/reset-password-confirmation.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard } from './auth/auth.guard';
import { UserInformationComponent } from './users/user-information/user-information.component';
import { AnnonceByUserComponent } from './annonces/annonce-by-user/annonce-by-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  //{ path: 'reset-password', component: ResetPasswordConfirmationComponent },
  { path: 'welcome-page', component: WelcomePageComponent, canActivate: [AuthGuard] },
  { path: 'annonces', component: AnnoncesCardComponent },
  { path: 'annonces/add', component: AddAnnonceComponent },
  { path: 'annonces/update', component: AddAnnonceComponent },
  { path: 'users', component: UserTableComponent },
  { path: 'user/info', component: UserInformationComponent },
  { path: 'user/annonces', component: AnnonceByUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
