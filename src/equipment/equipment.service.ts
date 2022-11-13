import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel( Equipment.name )
    private readonly EquipmentModel: Model<Equipment>,
  ){}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      createEquipmentDto.nameClient = createEquipmentDto.nameClient.toLowerCase();
      createEquipmentDto.lastNameClient = createEquipmentDto.lastNameClient.toLowerCase();
      createEquipmentDto.nameEquipment = createEquipmentDto.nameEquipment.toLowerCase();
      createEquipmentDto.description = createEquipmentDto.description.toLowerCase();

      const equipment  = await this.EquipmentModel.create(createEquipmentDto);

      return equipment;
      
    } catch (error) {
      this.handleExeptions( error );
    }
  }

  async findAll() {
    return await this.EquipmentModel.find().exec();
  }

  async findOne(term: string) {
    let equipment: Equipment;
    
    if( !isNaN(+term) ){
      equipment = await this.EquipmentModel.findOne({ no:term });
    }

    if( !equipment && isValidObjectId( term ) ){
      equipment = await this.EquipmentModel.findById( term );
    }
 
    if( !equipment ){
      equipment = await this.EquipmentModel.findOne({ nameClient:term.toLowerCase().trim() });
    }

    if( !equipment ) throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);
    return equipment;
  }

  async update(term: string, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.findOne( term );

    if(!equipment)
        throw new BadRequestException('Equipment no exists.');

    if( updateEquipmentDto.nameClient )
      updateEquipmentDto.nameClient = updateEquipmentDto.nameClient.toLowerCase();
      updateEquipmentDto.lastNameClient = updateEquipmentDto.lastNameClient.toLowerCase();
      updateEquipmentDto.nameEquipment = updateEquipmentDto.nameEquipment.toLowerCase();
      updateEquipmentDto.description = updateEquipmentDto.description.toLowerCase();
    
      try{

      await equipment.updateOne( updateEquipmentDto );

       return {...equipment.toJSON(), ...updateEquipmentDto };
      } catch (error) {
        this.handleExeptions( error );
      }
  }

  async remove(id: string) {
    const { deletedCount } = await this.EquipmentModel.deleteOne({ _id: id});

    if( deletedCount === 0 )
      throw new BadRequestException(`User with id "${id}" not found`)

    return true;
  }
  private handleExeptions( error:any ){
    if(error.code == 11000){
      throw new BadRequestException(`User exists in DB ${JSON.stringify( error.keyValue )}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create User - check server logs`);
  }
}
