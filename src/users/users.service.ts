import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel( User.name )
    private readonly UserModel: Model<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    createUserDto.name = createUserDto.name.toLowerCase();

    try {
      const user  = await this.UserModel.create( createUserDto ) ;

      return user;
    } catch (error) {
      this.handleExeptions( error );
    }
  }

  async findAll() {

    return `This action returns all users`;
  }

  async findOne(id: string) {
    let user: User;

    if( !user && isValidObjectId( id ) ){
      user = await this.UserModel.findById( id );
    }
 
    if( !user ){
      user = await this.UserModel.findOne({ name:id.toLowerCase().trim() });
    }
    return user;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne( term );

    if( updateUserDto.name )
      updateUserDto.name = updateUserDto.name.toLowerCase();
    
    try{
      await user.updateOne(updateUserDto);
      return {...user.toJSON(), ...updateUserDto };
    } catch (error) {
      this.handleExeptions( error );
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.UserModel.deleteOne({ _id: id});

    if( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${id}" not found`)

    return true;
  }

  private handleExeptions( error:any ){
    if(error.code == 11000){
      throw new BadRequestException(`Pokemin exists in DB ${JSON.stringify( error.keyValue )}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - check server logs`);
  }
}
