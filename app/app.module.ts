import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard.component';
import { KCapDetailComponent } from './kcap-detail.component';
import { KCapsComponent } from './kcaps.component';
import { KCapService } from './kcap.service';
import { GoogleDriveProvider } from './google-drive';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'kcaps',
        component: KCapsComponent
      },
      {
        path: 'detail/:id',
        component: KCapDetailComponent
      },
    ])
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    KCapDetailComponent,
    KCapsComponent
  ],
  providers: [
    KCapService,
    GoogleDriveProvider
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

