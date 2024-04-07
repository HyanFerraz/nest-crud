import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './config';
import { AuthModule, ProductModule, UserModule } from './common/modules';
import { jwtConfig } from './config/jwt';

@Module({
  imports: [
    // Global variables configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, jwtConfig],
    }),
    // Database connection
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
    // Importing common module
    UserModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
