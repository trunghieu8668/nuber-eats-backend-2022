import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RestraurantsModule } from './restraurants/restraurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

console.log(process.cwd());

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestraurantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'nuber-eats',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      // logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// #1.0 Apollo Server Setup
// "Error: Apollo Server requires either an existing schema, modules or typeDefs"
// serrano는 위 에러가 바로 발생하였지만, 나는 @nestjs/graphql의 버젼이 10 이상이었기 때문에,
// driver 옵션을 명시하지 않는다면, 위 에러가 발생하기도 전에 driver 관련된 에러가 발생하게 된다.
// @nestjs/apollo를 설치하고 ApolloDriver, ApolloDriverConfig를 import해서,
// 위와 같이 driver 옵션을 명시해 준다면, 더 이상 driver 관련 에러는 발생하지 않고,
// serrano가 발생했던 typeDefs 에러를 나또한 마찬가지로 마주할 수 있다.
