import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeFavoriteComponent} from './recipe-favorite.component';

describe('RecipeFavoriteComponent', () => {
  let component: RecipeFavoriteComponent;
  let fixture: ComponentFixture<RecipeFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeFavoriteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
