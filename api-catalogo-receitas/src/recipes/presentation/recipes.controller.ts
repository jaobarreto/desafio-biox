// src/recipes/presentation/recipes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeUseCase } from '../application/use-cases/create-recipe/create-recipe.use-case';
import { ListAllRecipesUseCase } from '../application/use-cases/list-all-recipes/list-all-recipes.use-case';
import { GetRecipeByIdUseCase } from '../application/use-cases/get-recipe-by-id/get-recipe-by-id.use-case';
import { CreateRecipeRequestDto } from '../infrastructure/dtos/create-recipe.request.dto';
import {
  RecipePresenter,
  RecipeOutputDto,
} from '../application/presenters/recipe.presenter';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly listAllRecipesUseCase: ListAllRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createRecipeDto: CreateRecipeRequestDto,
  ): Promise<RecipeOutputDto> {
    const recipeInput = {
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      ingredients: createRecipeDto.ingredients,
    };
    const createdRecipe = await this.createRecipeUseCase.execute(recipeInput);
    return RecipePresenter.toHTTP(createdRecipe);
  }

  @Get()
  async findAll(): Promise<RecipeOutputDto[]> {
    const recipes = await this.listAllRecipesUseCase.execute();
    return RecipePresenter.toHTTPList(recipes);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeOutputDto> {
    const recipe = await this.getRecipeByIdUseCase.execute({ id });

    if (!recipe) {
      throw new NotFoundException(`Receita com ID "${id}" não encontrada.`);
    }
    return RecipePresenter.toHTTP(recipe);
  }
}
