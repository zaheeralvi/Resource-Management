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
    AddResourceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
