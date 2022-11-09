import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EquipmentModule } from './equipment/equipment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:12Ho34la12@tiendabcst.utyi8lc.mongodb.net/TiendaBcSt'),
    UsersModule,
    EquipmentModule,
    CommonModule
  ],
})
export class AppModule {}
