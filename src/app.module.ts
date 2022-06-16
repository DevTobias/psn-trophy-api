import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './features/psn/auth/auth.module';
import { TrophyModule } from './features/psn/trophy/trophy.module';

const modules = [TrophyModule, AuthModule];

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'default_database',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ...modules,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: 'graphql/schema.gql',
      cors: {
        origin: 'https://studio.apollographql.com',
        credentials: true,
      },
    }),
  ],
})
export class AppModule {}
