import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WebapiComponent } from './webapi/webapi.component';

const routes: Routes = [/* Changes start here. */
{
  path: 'profile',
  component: ProfileComponent,
  // The profile component is protected with MSAL Guard.
  canActivate: [MsalGuard]
},
{
  path: 'webapi',
  component: WebapiComponent,
  // The profile component is protected with MSAL Guard.
  canActivate: [MsalGuard]
},
{
  // The home component allows anonymous access
  path: '',
  component: HomeComponent
}
/* Changes end here. */];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation:'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
