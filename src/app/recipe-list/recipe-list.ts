import { Component } from '@angular/core';
import { Recipe } from '../models/model';
import { RecipeServiceTs } from '../services/recipe.service.ts';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeServiceTs,
    private router: Router
  ) {
    this.recipes = this.recipeService.getAll();
  }

  viewRecipe(id: number){
    this.router.navigate(['/recipes', id]);
  }

  deleteRecipe(id: number){
    this.recipeService.delete(id);
    this.recipes = this.recipeService.getAll();
  }
}
