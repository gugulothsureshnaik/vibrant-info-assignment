import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dashboard';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { UserViewDetailsComponent } from './user-view-details';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:id', component: UserViewDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
