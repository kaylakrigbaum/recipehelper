import {Component, OnInit, ElementRef,  ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  dataStoredRecipes: any;
  dataStoredColumns = ['title', 'ingredients', 'instructions'];
  dataSource = new StoredRecipes(this.api);

  dataEdamamColumns = ['title', 'favorite', 'icon', 'ingredients', 'instructions'];
  dataEdamamApi = [];

  favoriteData = [];

  edamamAPI = 'https://api.edamam.com/search?q=';
  edamamID = '&app_id=48518b9b';
  edamamKEY = '&app_key=7753e2c9359b3cded5d000806817c845';
  searchValue: any;

  constructor(private api: ApiService, private _http: HttpClient, private router: Router) {
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
          title: singleRecipe.label, icon: singleRecipe.image, ingredients: singleRecipe.ingredientLines.toString(), instructions: singleRecipe.url
        };
      });
    });
  }

  postFavorite(row) {
    console.log(row)
    this.api.postRecipe(row).subscribe(res => {
      const id = res['_id'];
      this.router.navigate(['/recipe-details', id]).then(r => {});
    }, (err) => {
      console.log(err);
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
