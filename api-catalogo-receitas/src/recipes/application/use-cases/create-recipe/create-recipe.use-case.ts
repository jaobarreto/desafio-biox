// src/recipes/application/use-cases/create-recipe/create-recipe.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Recipe } from '../../../domain/entities/recipe-entity';
import {
  RecipeRepository,
  RECIPE_REPOSITORY_TOKEN,
} from '../../../domain/repositories/recipe.repository';
import { CreateRecipeInputDto } from './create-recipe.input.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateRecipeUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY_TOKEN)
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(input: CreateRecipeInputDto): Promise<Recipe> {
    const now = new Date();
    const newRecipe: Recipe = {
      id: uuidv4(),
      title: input.title,
      description: input.description,
      ingredients: input.ingredients,
      createdAt: now,
      updatedAt: now,
    };

    const createdRecipe = await this.recipeRepository.create(newRecipe);

    return createdRecipe;
  }
}
