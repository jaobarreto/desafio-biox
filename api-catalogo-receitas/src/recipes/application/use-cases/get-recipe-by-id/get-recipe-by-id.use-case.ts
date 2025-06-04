import { Inject, Injectable } from '@nestjs/common';
import { Recipe } from '../../../domain/entities/recipe-entity';
import {
  RecipeRepository,
  RECIPE_REPOSITORY_TOKEN,
} from '../../../domain/repositories/recipe.repository';
import { GetRecipeByIdInputDto } from './get-recipe-by-id.input.dto';

@Injectable()
export class GetRecipeByIdUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY_TOKEN)
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(input: GetRecipeByIdInputDto): Promise<Recipe | null> {
    const recipe = await this.recipeRepository.findById(input.id);

    //add erro customizado caso a receita não seja encontrada
    if (!recipe) {
      return null;
    }

    return recipe;
  }
}
