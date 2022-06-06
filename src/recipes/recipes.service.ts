import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly usersRepository: Repository<Recipe>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return this.usersRepository.save(new Recipe(data));
  }

  async findOneById(id: string): Promise<Recipe> {
    const cacheRecipe: Recipe = await this.cacheManager.get(`recipe-${id}`);

    if (!cacheRecipe) {
      const dbRecipe = await this.usersRepository.findOneBy({ id });
      await this.cacheManager.set(`recipe-${id}`, dbRecipe);
      return dbRecipe;
    }

    return cacheRecipe;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.usersRepository.find(recipesArgs);
  }

  async remove(id: string): Promise<boolean> {
    return (await this.usersRepository.delete(id)).affected >= 1;
  }
}
