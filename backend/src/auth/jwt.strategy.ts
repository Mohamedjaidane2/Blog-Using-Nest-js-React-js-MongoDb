import {Injectable} from '@nestjs/common'
import{PassportStrategy} from '@nestjs/passport'
import {Strategy,ExtractJwt} from 'passport-jwt'
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "topSecret51",
        });  
    }

    async validate(payload: any) {
    return { 
    username: payload.userName,
    firstName:payload.firstName,
    lastName:payload.lastName,
    role:payload.role,
    picture:payload.picture,
    article:payload.article,
    createddate:payload.createdDate,
    id:payload._id,
    bio:payload.bio
    
     };
  }
    }
