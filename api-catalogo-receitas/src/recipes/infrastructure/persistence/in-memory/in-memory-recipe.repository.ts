import { Injectable } from '@nestjs/common';
import { Recipe } from '../../../domain/entities/recipe-entity';
import { RecipeRepository } from '../../../domain/repositories/recipe.repository';

@Injectable()
export class InMemoryRecipeRepository implements RecipeRepository {
  private readonly recipes: Recipe[] = []; // array para armazenar as receitas em memoria

  async create(recipe: Recipe): Promise<Recipe> {
    this.recipes.push(recipe);
    return recipe;
  }

  async findById(id: string): Promise<Recipe | null> {
    const recipe = this.recipes.find((r) => r.id === id);
    return recipe || null;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipes;
  }
}
