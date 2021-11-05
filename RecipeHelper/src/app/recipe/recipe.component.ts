import {Component, OnInit, ElementRef,  ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  dataStoredRecipes: any;
  dataStoredColumns = ['title', 'ingredients', 'instructions'];
  dataSource = new StoredRecipes(this.api);
  
  dataEdamamColumns = ['name', 'icon', 'ingredients', 'method'];
  dataEdamamApi = [];

  edamamAPI = 'https://api.edamam.com/search?q=';
  edamamID = '&app_id=48518b9b';
  edamamKEY = '&app_key=7753e2c9359b3cded5d000806817c845';

  constructor(private api: ApiService, private _http: HttpClient) {
  }

  ngOnInit() {
    this.api.getRecipes()
      .subscribe(res => {
        console.log(res);
        this.dataStoredRecipes = res;
      }, err => {
        console.log(err);
      });
  }

  getEdamamRecipes(recipeValue) {
    console.log("recipe values", recipeValue);
    this._http
    .get(
      this.edamamAPI 
    + recipeValue 
    + this.edamamID 
    + this.edamamKEY)
    .subscribe((res: any) => {
      console.log("Edamam Response", res);
      this.dataEdamamApi = Object.keys(res.hits).map(function (key) {
        const singleRecipe = res.hits[key].recipe;
        console.log("Single Recipe:", singleRecipe);
        return {
          name: singleRecipe.label, icon: singleRecipe.image, ingredients: singleRecipe.ingredientLines.toString(), method: singleRecipe.url
        };
      });
    });
  }
}

export class StoredRecipes extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getRecipes();
  }

  disconnect() {
  }
}