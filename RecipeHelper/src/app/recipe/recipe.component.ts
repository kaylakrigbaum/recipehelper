import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/collections';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipes: any;
  displayedColumns = ['title', 'ingredients', 'instructions'];
  dataSource = new RecipeDataSource(this.api);

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getRecipes()
      .subscribe(res => {
        console.log(res);
        this.recipes = res;
      }, err => {
        console.log(err);
      });
  }
}

export class RecipeDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getRecipes();
  }

  disconnect() {
  }
}
