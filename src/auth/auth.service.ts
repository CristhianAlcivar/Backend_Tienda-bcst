import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name )
    private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) { 
    try {
      createUserDto.name = createUserDto.name.toLowerCase();
      createUserDto.password = bcrypt.hashSync( createUserDto.password,10);
      const user  = await this.UserModel.create(createUserDto);
      
      user.password = "";
      delete user.password;

      return {
        user,
        token: this.getJwtToken({email: user.email })
      };
    } catch (error) {
      this.handleExeptions( error );
    }
  }

  async findAll() {

    return await this.UserModel.find().exec();
  }

  async findOne(term: string) {
    let user: User;

    if( !isNaN(+term) ){
      user = await this.UserModel.findOne({ no:term });
    }
    if( !user && isValidObjectId( term ) ){
      user = await this.UserModel.findById( term );
    }
 
    if( !user ){
      user = await this.UserModel.findOne({ name:term.toLowerCase().trim() });
    }

    if( !user ) throw new NotFoundException(`User with id, name or no "${ term }" not found`);
    return user;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {

      const user = await this.findOne( term );
   
      if(!user)
        throw new BadRequestException('User no exists.');

    try{
      if( updateUserDto.name )
        updateUserDto.name = updateUserDto.name.toLowerCase();
    
      const { password, ...userData } = updateUserDto;

      await user.updateOne({
        userData,
        password: bcrypt.hashSync( password,10)
      });
      delete updateUserDto.password;
      return {...user.toJSON(), ...updateUserDto };
    } catch (error) {
      this.handleExeptions( error );
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.UserModel.deleteOne({ _id: id});

    if( deletedCount === 0 )
      throw new BadRequestException(`User with id "${id}" not found`)

    return true;
  }

  async login( loginUserDto:LoginUserDto ){
    const loginUser= loginUserDto;
    const email = loginUser.email.toLowerCase();

    const user = await this.UserModel.findOne({ email });
   
    if(!user)
      throw new UnauthorizedException('Credentials are not valid (email).');

    if( !bcrypt.compareSync( loginUser.password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password).');

    return {
      user,
      token: this.getJwtToken({email: user.email })
    };
  }
  private getJwtToken( payload: JwtPayload ){
    const token = this.jwtService.sign( payload );

    return token;
  }
  private handleExeptions( error:any ){
    if(error.code == 11000){
      throw new BadRequestException(`User exists in DB ${JSON.stringify( error.keyValue )}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create User - check server logs`);
  }
}
