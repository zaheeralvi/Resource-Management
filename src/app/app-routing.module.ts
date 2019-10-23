import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { ResourceComponent } from './resource/resource.component';
import { SubcatComponent } from './subcat/subcat.component';
import { GridresourceComponent } from './gridresource/gridresource.component';
import { AdminComponent } from './admin/admin.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { PendingComponent } from './pending/pending.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: "categories", component:CategoriesComponent},
  {path: "home", component:HomeComponent},
  {path: "resource", component:ResourceComponent},
  {path: "subcat/:id", component:SubcatComponent},
  {path : "gridresource", component:GridresourceComponent},
  {path : "admin", component:AdminComponent},
  {path : "pending", component:PendingComponent},
  {path : "addtopic", component:AddtopicComponent},
  {path : "search", component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
