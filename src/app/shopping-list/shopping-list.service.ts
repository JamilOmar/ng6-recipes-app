import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new  Subject<Ingredient[]>();
  startedEditing = new  Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes' , 13),
    new Ingredient('Potatos' , 56)
  ];
  constructor() { }


  getIngredients() {
    return this.ingredients.slice();
  }

  getInggredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }
  updateIngredient( index: number , ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients);

  }
  deleteIngredient( index: number ) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients);

  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }
}
