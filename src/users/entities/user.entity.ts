import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        index: true
    })
    name: string;
    @Prop({
        unique: true,
        index: true
    })
    email: string;
    password: string;
}

export const UsersSchema = SchemaFactory.createForClass( User );
