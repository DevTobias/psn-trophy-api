import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { AuthModule } from './features/psn/auth/auth.module';
import { SearchModule } from './features/psn/search/search.module';
import { TrophyModule } from './features/psn/trophy/trophy.module';
import { UserModule } from './features/psn/user/user.module';

const modules = [TrophyModule, AuthModule, SearchModule, UserModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
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
