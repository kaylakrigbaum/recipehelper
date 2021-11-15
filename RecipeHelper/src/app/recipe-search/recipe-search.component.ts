import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
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