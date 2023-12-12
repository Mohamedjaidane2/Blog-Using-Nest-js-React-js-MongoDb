import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { nanoid } from 'nanoid';
import { Role } from "src/auth/Authorization/role.enum";



export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;
    @Prop({ required: true })
    lastName: string;
    @Prop({ required: true, unique: true })
    userName: string;
    @Prop({ required: true })
    password: string;
    @Prop({ default: Date.now() })
    createdDate: Date;
    @Prop({ enum: Role, required: true })
    role: string;
    @Prop({ default: nanoid() })
    blogLink: string
    @Prop({ default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel mollis nunc, eget dictum ex. Morbi bibendum maximus cursus. Ut ipsum sapien, egestas at risus eu, commodo sollicitudin nunc. Phasellus mattis erat vel viverra ultricies. Vestibulum ut arcu nulla. Vestibulum molestie turpis vel urna varius, ut pharetra augue semper. Fusce turpis tellus, condimentum ut sagittis sit amet, consequat vel lorem. Sed odio ipsum, lacinia a diam et, commodo faucibus nisi. Curabitur ultrices velit non risus lacinia, quis viverra velit luctus." })
    bio: string;
    @Prop({ default: "http://localhost:3000/users/picture/user-1a57.png" })
    picture: string;
    @Prop()
    podcast: [{
        id: string,
        cover: string,
        mediaLink: string,
        title: string,
    }]
    @Prop()
    article: [{
        id: string,
        cover: string,
        mediaLink: string,
        title: string,
        description: string,
        articleCreationDate: string;
    }];
}
export const UserSchema = SchemaFactory.createForClass(User)
