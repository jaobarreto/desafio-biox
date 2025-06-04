import { Inject, Injectable } from '@nestjs/common';
import { Recipe } from '../../../domain/entities/recipe-entity';
import {
  RecipeRepository,
  RECIPE_REPOSITORY_TOKEN,
} from '../../../domain/repositories/recipe.repository';

@Injectable()
export class ListAllRecipesUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY_TOKEN)
    private readonly recipeRepository: RecipeRepository,
  ) {}
  async execute(): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.findAll();
    return recipes;
  }
}
