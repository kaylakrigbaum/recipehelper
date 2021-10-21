import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {st} from '@angular/core/src/render3';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  title = '';
  ingredients = '';
  instructions = '';
  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'ingredients': [null, Validators.required],
      'instructions': [null, Validators.required],
    });
    this.getRecipe(this.route.snapshot.params['id']);
  }
  getRecipe(id) {
    this.api.getRecipe(id).subscribe(data => {
      id = data._id;
      this.recipeForm.setValue({
        title: data.title,
        instructions: data.instructions,
        ingredients: data.ingredients,
      });
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.api.updateRecipe(this.route.snapshot.params['id'], form)
      .subscribe( res => {
        this.router.navigate(['/recipe-details', this.route.snapshot.params['id']]);
      }, (err) => {
        console.log(err);
      });
    }
  }
