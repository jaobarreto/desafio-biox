import { Recipe } from '../../domain/entities/recipe-entity';

export interface RecipeOutputDto {
  id: string;
  title: string;
  ingredients: string[];
  createdAt: string;
}

export class RecipePresenter {
  static toHTTP(recipe: Recipe): RecipeOutputDto {
    return {
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      createdAt: recipe.createdAt.toISOString(), // converte Date para string ISO 8601
    };
  }
  // Converte uma lista de receitas para o formato HTTP
  static toHTTPList(recipes: Recipe[]): RecipeOutputDto[] {
    return recipes.map((recipe) => this.toHTTP(recipe));
  }
}
