import { Recipe } from '../entities/recipe-entity';

export interface RecipeRepository {
  create(recipe: Recipe): Promise<Recipe>;

  findById(id: string): Promise<Recipe | null>;

  findAll(): Promise<Recipe[]>;
}

export const RECIPE_REPOSITORY_TOKEN = Symbol('RecipeRepository');
