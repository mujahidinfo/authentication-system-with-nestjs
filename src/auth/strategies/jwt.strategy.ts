import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "ksajdflkasjdas" // FIXME: Move to .env
        });
    }

    async validate(payload: {sub: string, username: string}) {
        return {userId: payload.sub, username: payload.username};
    }
}