import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto} from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards( AuthGuard() )
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('users')
  @UseGuards( AuthGuard() )
  findAll() {
    return this.authService.findAll();
  }

  @Get('user/:id')
  @UseGuards( AuthGuard() )
  findOne(@Param('id') id: string) {
    return this.authService.findOne( id );
  }

  @Patch('update/:term')
  @UseGuards( AuthGuard() )
  update(@Param('term') term: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(term, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards( AuthGuard() )
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.authService.remove(id);
  }
}
