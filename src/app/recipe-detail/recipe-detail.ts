import { Component } from '@angular/core';
import { Recipe } from '../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServiceTs } from '../services/recipe.service.ts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  recipe?: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeServiceTs,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipeService.getById(id);
  }

  editRecipe(){
    this.router.navigate(['/recipes', this.recipe?.id, 'edit']);
  }

  back(){
    this.router.navigate(['/recipes']);
  }
}
