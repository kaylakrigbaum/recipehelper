import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeCreateComponent} from './recipe-create/recipe-create.component';
import {RecipeSearchComponent} from './recipe-search/recipe-search.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipeComponent,
    data: {title: 'Recipe List'}
  },
  {
    path: 'recipe-details/:id',
    component: RecipeDetailComponent,
    data: {title: 'Recipe Details'}
  },
  {
    path: 'recipe-create',
    component: RecipeCreateComponent,
    data: {title: 'Create Recipe'}
  },
  {
    path: 'recipe-edit/:id',
    component: RecipeEditComponent,
    data: {title: 'Edit Recipe'}
  },
  {
    path: 'recipe-create-from/:row',
    component: RecipeCreateComponent,
    data: {title: 'Create Favorite'}
  },
  {
    path: 'recipe-search',
    component: RecipeSearchComponent,
    data: {title: 'Search Recipes'}
  },
  {
    path: 'recipe-list',
    component: RecipeListComponent,
    data: {title: 'List Recipes'}
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeCreateComponent,
    RecipeSearchComponent,
    RecipeListComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
