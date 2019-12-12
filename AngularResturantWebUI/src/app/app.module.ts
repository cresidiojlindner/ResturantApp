import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { HttpClientModule } from '@angular/common/http';  
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';  
  
import { AppRoutingModule } from './app-routing.module';  
import { AppComponent } from './app.component';  
import { HeaderComponent } from './ui/header/header.component';  
import { FooterComponent } from './ui/footer/footer.component';  
import { LayoutComponent } from './ui/layout/layout.component';  
import { HomeComponent } from './home/home.component';  
import { ResturantListComponent } from './resturant/resturant-list/resturant-list.component';  
import { ResturantEditComponent } from './resturant/resturant-edit/resturant-edit.component';  
import { ResturantDetailComponent } from './resturant/resturant-detail/resturant-detail.component';  
import { ResturantEditGuard } from './resturant/resturant-edit/resturant-edit-guard';  
import { ResturantService } from './resturant/resturant.service';  
  
  
@NgModule({  
  declarations: [  
    AppComponent,  
    HeaderComponent,  
    FooterComponent,  
    LayoutComponent,  
    HomeComponent,  
    ResturantListComponent,  
    ResturantEditComponent,  
    ResturantDetailComponent  
  ],  
  imports: [  
    BrowserModule,  
    AppRoutingModule,  
    HttpClientModule,  
    ReactiveFormsModule,  
    FormsModule,  
    RouterModule.forRoot([  
      {  
        path: 'home',  
        component: HomeComponent  
      },  
      {  
        path: 'resturants',  
        component: ResturantListComponent  
      },  
      {  
        path: 'resturants/:id/:zipCode',  
        component: ResturantDetailComponent  
      },  
      {  
        path: 'resturants/:id/:zipCode/edit',  
        canDeactivate: [ResturantEditGuard],  
        component: ResturantEditComponent  
      },  
      {  
        path: '',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      },  
      {  
        path: '**',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      }  
    ])  
  ],  
  providers: [  
    ResturantService  
  ],  
  bootstrap: [AppComponent]  
})  
export class AppModule { }  