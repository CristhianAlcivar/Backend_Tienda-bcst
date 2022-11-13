import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema()
export class Equipment extends Document {
    
    @Prop({
        unique: true,
        index: true,
        type: SchemaTypes.ObjectId,
    })
    id:  Types.ObjectId;

    @Prop({index: true, type:String})
    nameClient: string;

    @Prop({index: true, type:String})
    lastNameClient: string;

    @Prop({type:String})
    email: string;  

    @Prop({ type: String})
    nameEquipment: string;

    @Prop({ type: String})
    serie: string;

    @Prop({ type: String})
    description: string;

    @Prop({type: Number})
    category: Number;
}

export const EquipmentSchema = SchemaFactory.createForClass( Equipment );