import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-favorite',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeFavoriteComponent implements OnInit {

  recipeForm: FormGroup;
  title = '';
  ingredients = '';
  instructions = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'ingredients': [null, Validators.required],
      'instructions': [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postRecipe(form)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/recipe-details', id]).then(r => {});
      }, (err) => {
        console.log(err);
      });
  }
}
