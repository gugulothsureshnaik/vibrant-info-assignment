import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { UserViewDetailsComponent } from './user-view-details';
import { DashBoardComponent } from './dashboard';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, NgxTablePaginationModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule, 
        ToastrModule.forRoot(), 
        NgxLoadingModule.forRoot({}),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        DashBoardComponent,
        UserViewDetailsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }