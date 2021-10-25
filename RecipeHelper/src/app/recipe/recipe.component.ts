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
  displayedColumns = ['title', 'ingredients', 'instructions'];
  dataSource = new StoredRecipes(this.api);
  dataEdamamApi: any;

  @ViewChild('recipe') recipes: ElementRef;
  recipeValue: any;

  edamamAPI = 'https://api.edamam.com/search?q=';
  edamamID = '&app_id=48518b9b';
  edamamKEY = '&app_key=cf1465e373df64c60e277c9de2857f04';

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

    this.getEdamamRecipes();
  }

  getEdamamRecipes() {

    this.recipeValue = this.recipes.nativeElement.value;

    if (this.recipeValue !== null) {
      this._http
      .get(
        this.edamamAPI 
      + this.recipeValue 
      + this.edamamID 
      + this.edamamKEY)
      .subscribe((res: any) => {
        this.dataEdamamApi = Object.keys(res.recipe).map(recipeKey => {
          const singleRecipe = res.hits[recipeKey].recipe;
          return {
            name: singleRecipe.label, icon: singleRecipe.image, url: singleRecipe.url
          };
        });
      });
    }
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