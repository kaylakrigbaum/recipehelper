import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  dataStoredRecipes: any;
  dataStoredColumns = ['title', 'ingredients', 'instructions'];
  dataSource = new StoredRecipes(this.api);

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
