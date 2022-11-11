import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<User>,

    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        
    }
    async validate( payload: JwtPayload): Promise<User>{

        const {email} = payload;

        const user = await this.UserModel.findOne({ email });

        if (!user)
            throw new UnauthorizedException('Token not valid.');

        if(!user.isActive)
        throw new UnauthorizedException('User is inactive, talk with an admin.');

        return user;
    }
}