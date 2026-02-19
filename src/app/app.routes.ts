import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeForm } from './recipe-form/recipe-form';
import { RecipeDetail } from './recipe-detail/recipe-detail';


export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipeList},
    { path: 'recipes/new', component: RecipeForm},
    { path: 'recipes/:id', component: RecipeDetail},
    { path: 'recipes/:id/edit', component: RecipeForm}
];
