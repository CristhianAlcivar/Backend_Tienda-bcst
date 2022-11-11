import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UsersSchema,
      }
    ]),
    PassportModule.register({defaultStrategy:'jwt'}),

    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory : ()=>{
        return{
          secret: process.env.JWT_SECRET,
          signOptions:{
          expiresIn: '8h'
          }
        }
      }
    })
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions:{
    //     expiresIn: '8h'
    //   }
    // })

  ],
  exports: [MongooseModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
