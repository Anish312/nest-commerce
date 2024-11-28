import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
const fakeUsers = [{
    id :1,
    username: 'test', 
    password: 'test' 
}
];
@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    validateUser({username , password} : AuthPayloadDto) {
        const findUser = fakeUsers.find(user => user.username === username );

        if(!findUser) {
            return null;  // User not found
        }

        if(password === findUser.password) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password,...user} = findUser;
            return this.jwtService.sign({ user }); 
        }
    }
}
