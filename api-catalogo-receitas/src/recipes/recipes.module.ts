import { Module } from '@nestjs/common';
import { RecipesController } from './presentation/recipes.controller';
import { CreateRecipeUseCase } from './application/use-cases/create-recipe/create-recipe.use-case';
import { ListAllRecipesUseCase } from './application/use-cases/list-all-recipes/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from './application/use-cases/get-recipe-by-id/get-recipe-by-id.use-case';
import { InMemoryRecipeRepository } from './infrastructure/persistence/in-memory/in-memory-recipe.repository';
import { RECIPE_REPOSITORY_TOKEN } from './domain/repositories/recipe.repository';

@Module({
  imports: [],
  controllers: [RecipesController],
  providers: [
    CreateRecipeUseCase,
    ListAllRecipesUseCase,
    GetRecipeByIdUseCase,
    {
      provide: RECIPE_REPOSITORY_TOKEN,
      useClass: InMemoryRecipeRepository,
    },
  ],
})
export class RecipesModule {}
