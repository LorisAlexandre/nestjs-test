import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ default: false })
  newsLetter: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
