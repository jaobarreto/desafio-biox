import { Test, TestingModule } from '@nestjs/testing';
import { GetRecipeByIdUseCase } from './get-recipe-by-id.use-case';
import {
  RecipeRepository,
  RECIPE_REPOSITORY_TOKEN,
} from '../../../domain/repositories/recipe.repository';
import { Recipe } from '../../../domain/entities/recipe-entity';
import { GetRecipeByIdInputDto } from './get-recipe-by-id.input.dto';

const mockRecipeRepository = {
  findById: jest.fn(),
};

describe('GetRecipeByIdUseCase', () => {
  let useCase: GetRecipeByIdUseCase;
  let repository: RecipeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRecipeByIdUseCase,
        {
          provide: RECIPE_REPOSITORY_TOKEN,
          useValue: mockRecipeRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetRecipeByIdUseCase>(GetRecipeByIdUseCase);
    repository = module.get<RecipeRepository>(RECIPE_REPOSITORY_TOKEN);

    mockRecipeRepository.findById.mockClear();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a recipe when found', async () => {
      const recipeId = 'some-valid-id';
      const expectedRecipe: Recipe = {
        id: recipeId,
        title: 'Test Recipe',
        description: 'Test Description',
        ingredients: ['ingredient1', 'ingredient2'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRecipeRepository.findById.mockResolvedValue(expectedRecipe);

      const input: GetRecipeByIdInputDto = { id: recipeId };
      const result = await useCase.execute(input);

      expect(repository.findById).toHaveBeenCalledWith(recipeId);

      expect(result).toEqual(expectedRecipe);
    });

    it('should return null when recipe is not found', async () => {
      const recipeId = 'non-existent-id';

      mockRecipeRepository.findById.mockResolvedValue(null);

      const input: GetRecipeByIdInputDto = { id: recipeId };
      const result = await useCase.execute(input);

      expect(repository.findById).toHaveBeenCalledWith(recipeId);

      expect(result).toBeNull();
    });
  });
});
