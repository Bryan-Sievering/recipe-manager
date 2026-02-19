import { Injectable } from '@angular/core';
import { Recipe } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceTs {
  private recipes: Recipe[] = [{
    id: 1,
    name: 'Pancakes',
    description: 'Fluffy breakfast Pancakes',
    ingredients: ['flour', 'eggs', 'milk'],
    instructions: 'mix ingredients then cook on a pan'
  }
  ];

  getAll(): Recipe[] {
    return this.recipes;
  }

  getById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  add(recipe: Recipe){
    this.recipes.push(recipe);
  }

  update(id: number, updated: Recipe){
    const index = this.recipes.findIndex(r => r.id === id);
    if (index !== -1){
      this.recipes[index] = updated;
    }
  }

  delete(id: number){
    this.recipes = this.recipes.filter(r => r.id !== id);
  }
}
