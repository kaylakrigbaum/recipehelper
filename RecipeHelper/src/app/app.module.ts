import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeCreateComponent} from './recipe-create/recipe-create.component';
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
    path: 'Recipes',
    component: RecipeComponent,
    data: {title: 'Recipe List'}
  },
  {
    path: 'Recipe-details/:id',
    component: RecipeDetailComponent,
    data: {title: 'Recipe Details'}
  },
  {
    path: 'Recipe-create',
    component: RecipeCreateComponent,
    data: {title: 'Create Recipe'}
  },
  {
    path: 'Recipe-edit/:id',
    component: RecipeEditComponent,
    data: {title: 'Edit Recipe'}
  },
  {
    path: '',
    redirectTo: '/Recipes',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeCreateComponent,
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
