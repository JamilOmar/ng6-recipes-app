import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import { environment } from './../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class DataStorageService {

  private recipesURL = `${environment.firebaseURL}/recipes.json`;
  constructor(private http: Http , private recipeService: RecipeService) {

   }
   storeRecipes() {
     return this.http.put( this.recipesURL, this.recipeService.getRecipes());
   }
   getRecipes() {
    return this.http.get(this.recipesURL).pipe( map((response: Response) => {
      const recipes: Recipe[] = response.json();
      for ( const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }) ).subscribe( (recipes: Recipe[]) => this.recipeService.setRecipes(recipes));
  }
}
