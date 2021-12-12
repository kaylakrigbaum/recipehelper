import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
/*Structures recipe*/
  recipe = {
    title: '',
    ingredients: '',
    instructions: '',
    _id: '/recipe-edit'
  };

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getRecipeDetails(this.route.snapshot.params['id']);
  }
 /*Retrieves the recipe details from the data base */
  getRecipeDetails(id) {
    this.api.getRecipe(id)
      .subscribe(data => {
        console.log(data);
        this.recipe = data;
      });
  }
/* Deletes the recipe from the webpage as well as the data base*/
  deleteRecipe(id) {
    this.api.deleteRecipe(id)
      .subscribe(res => {
          this.router.navigate(['/recipes']).then(r => {});
        }, (err) => {
          console.log(err);
        }
      );
  }

}
