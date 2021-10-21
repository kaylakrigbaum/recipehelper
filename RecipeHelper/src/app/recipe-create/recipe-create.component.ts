import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  recipeForm: FormGroup;
  title: string = '';
  ingredients: string = '';
  instructions: string = '';

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
        let id = res['_id'];
        this.router.navigate(['/recipe-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
