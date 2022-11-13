import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from './entities/equipment.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Equipment.name,
        schema: EquipmentSchema,
      }
    ]),
    AuthModule    
  ]
})
export class EquipmentModule {}
