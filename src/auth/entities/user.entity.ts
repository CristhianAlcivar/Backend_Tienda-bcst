import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, SchemaTypes, Types,  } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        index: true,
        type: SchemaTypes.ObjectId,
    })
    @Exclude()
    id:  Types.ObjectId;

    @Prop({index: true})
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    email: string;  

    @Prop({ type: String})
    @Exclude()
    password: string;

    @Prop({ 
        type: Boolean,
        default: true
    })
    isActive: boolean;

    @Prop({
        type: Array,
        default: ['user']
    })
    roles: string[]

}

export const UsersSchema = SchemaFactory.createForClass( User );
