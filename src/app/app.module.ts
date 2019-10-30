import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { SubcatComponent } from './subcat/subcat.component';
import { ResourceComponent } from './resource/resource.component';
import { GridresourceComponent } from './gridresource/gridresource.component';
import { AdminComponent } from './admin/admin.component';
import { PendingComponent } from './pending/pending.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { SearchComponent } from './search/search.component';
import { TopicsComponent } from './topics/topics.component';
import { SubTopicComponent } from './sub-topic/sub-topic.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { TopRatedComponent } from './top-rated/top-rated.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { RoleComponent } from './role/role.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { LoginComponent } from './login/login.component';
import { RatingModule } from 'ng-starrating';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    HomeComponent,
    SubcatComponent,
    ResourceComponent,
    GridresourceComponent,
    AdminComponent,
    PendingComponent,
    AddtopicComponent,
    SearchComponent,
    TopicsComponent,
    SubTopicComponent,
    AddResourceComponent,
    TopRatedComponent,
    RoleComponent,
    TeachersListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RatingModule ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    // { provide:  PathLocationStrategy, useClass:  PathLocationStrategy },
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
