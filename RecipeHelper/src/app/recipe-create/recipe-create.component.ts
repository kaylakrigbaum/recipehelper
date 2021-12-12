import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';


declare const annyang: any;

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  recipeForm: FormGroup;
  title = '';
  ingredients = '';
  instructions = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private ngZone: NgZone) {
  }
  voiceDisabled: boolean = true;
  voiceError: boolean = false;
  voiceSuccess: boolean = false;
  voiceListening: boolean = false;
  voiceText: any;

  initCallback(): void {
    annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is required";
        annyang.abort();
        this.ngZone.run(() => this.voiceSuccess = true);
      } else if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceListening = true);
    });

    annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('result', (userSaid) => {
      this.ngZone.run(() => this.voiceError = false);

      let queryText: any = userSaid[0];

      annyang.abort();

      this.voiceText = queryText;

      this.ngZone.run(() => this.voiceListening = false);
      this.ngZone.run(() => this.voiceSuccess = true);
    });
  }

  startVoice(): void {
    this.voiceDisabled = false;
    this.voiceError = false;
    this.voiceSuccess = false;
    this.voiceText = undefined;

    if (annyang) {
      let commands = {
        'demo-annyang': () => { }
      };

      annyang.addCommands(commands);

      this.initCallback();

      annyang.start({ autoRestart: false });
    }
  }

  closeVoice(): void {
    this.voiceDisabled = true;
    this.voiceError = false;
    this.voiceSuccess = false;
    this.voiceListening = false;
    this.voiceText = undefined;

    if(annyang){
      annyang.abort();
    }
  }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'ingredients': [null, Validators.required],
      'instructions': [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    console.log("this is the form: ",form)
    this.api.postRecipe(form)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/recipe-details', id]).then(r => {});
      }, (err) => {
        console.log(err);
      });
  }
}
