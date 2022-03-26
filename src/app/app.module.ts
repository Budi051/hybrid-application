import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


import { MovieComponent } from './movie/movie.component';
import { GenreComponent } from './genre/genre.component';
import { MoviegenreComponent } from './moviegenre/moviegenre.component';
import { LoginComponent } from './login/login.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';
import { AddmovieComponent } from './addmovie/addmovie.component';

import {MovieService} from './movie.service';
import {GenreService} from './genre.service';
import {LoginService} from './login.service';

const appRoutes:Routes=[
	{path:'movie', component: MovieComponent},
	{path:'genre', component: GenreComponent},
	{path:'moviegenre/:id', component: MoviegenreComponent},
	{path:'login', component: LoginComponent},
  {path:'detail/:id', component: MoviedetailComponent},
  {path:'addmovie', component: AddmovieComponent},
];

@NgModule({
  declarations: [AppComponent, MovieComponent, GenreComponent, MoviegenreComponent, LoginComponent, MoviedetailComponent, AddmovieComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule, CommonModule],
  providers: [
    FileTransfer,
    Camera,
  	MovieService,
  	GenreService,
    LoginService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
