import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../common/scalars/date.scalar';
import { Recipe } from './models/recipe.model';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), CacheModule.register()],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}