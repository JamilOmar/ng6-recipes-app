import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import { environment } from './../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class DataStorageService {

  private recipesURL = `${environment.firebaseURL}/recipes.json`;
  constructor(private http: Http , private recipeService: RecipeService , private authService: AuthService) {

   }
  storeRecipes() {
    const tk =  this.authService.getToken();
     return this.http.put( this.recipesURL + '?auth=' + tk, this.recipeService.getRecipes());
   }
  getRecipes() {
   const tk =  this.authService.getToken();
    return this.http.get(this.recipesURL + '?auth=' + tk ).pipe( map((response: Response) => {
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
