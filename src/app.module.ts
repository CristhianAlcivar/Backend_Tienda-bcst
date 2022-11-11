import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    AuthModule,
    EquipmentModule,
    CommonModule
  ],
})
export class AppModule {}
