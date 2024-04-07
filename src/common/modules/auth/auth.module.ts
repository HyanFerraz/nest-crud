import { Module } from '@nestjs/common';
import { AuthController } from 'src/common/controllers';
import { UserModule } from '../user';
import { AuthService } from 'src/common/providers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from 'src/common/guards';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: '30s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
