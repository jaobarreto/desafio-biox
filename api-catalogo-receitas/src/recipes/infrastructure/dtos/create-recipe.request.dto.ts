/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  MaxLength,
} from 'class-validator';

export class CreateRecipeRequestDto {
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  @MaxLength(100, { message: 'O título não pode ter mais que 100 caracteres.' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @MaxLength(500, {
    message: 'A descrição não pode ter mais que 500 caracteres.',
  })
  description: string;

  @IsArray({ message: 'Os ingredientes devem ser uma lista.' })
  @ArrayMinSize(1, { message: 'A receita deve ter pelo menos um ingrediente.' })
  @IsString({ each: true, message: 'Cada ingrediente deve ser uma string.' })
  ingredients: string[];
}
