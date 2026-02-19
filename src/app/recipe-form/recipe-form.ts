import { Component, inject } from '@angular/core'; // 1. Added inject
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; // 2. Added ReactiveFormsModule
import { RecipeServiceTs } from '../services/recipe.service.ts';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 3. Added CommonModule for directives

@Component({
  selector: 'app-recipe-form',
  standalone: true, // Assuming standalone based on imports array
  imports: [ReactiveFormsModule, CommonModule], // Add these to fix template errors
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeServiceTs);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editMode = false;
  recipeId!: number;

  recipeForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    ingredients: [''],
    instructions: ['', Validators.required]
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if(idParam){
      this.editMode = true;
      this.recipeId = Number(idParam);
      const recipe = this.recipeService.getById(this.recipeId);

      if(recipe){
        this.recipeForm.patchValue({ // patchValue is safer for filling forms
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients.join(','),
          instructions: recipe.instructions
        });
      }
    }
  }

  submit(){
    if(this.recipeForm.invalid) return;

    const value = this.recipeForm.value;

    const recipe = {
      id: this.editMode ? this.recipeId : Date.now(),
      name: value.name!,
      description: value.description || '',
      ingredients: value.ingredients!.split(',').map(i => i.trim()), // FIXED TYPO HERE
      instructions: value.instructions!
    };

    if(this.editMode){
      this.recipeService.update(this.recipeId, recipe);
    } else {
      this.recipeService.add(recipe);
    }

    this.router.navigate(['/recipes']);
  }
}