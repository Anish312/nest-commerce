import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/guards/local.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Post('login')
    @UseGuards(LocalGuard)
    login( @Body() authPayload: AuthPayloadDto) {

        const user = this.authService.validateUser(authPayload);
        if(!user ){
            throw new HttpException("Invalid credentials", 401);
        }
        return user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)

    @Get('status')//+
    @UseGuards(JwtAuthGuard)//+
    status(@Req() req: Request & { user: any }) {//+
        console.log(req.user);
    }
}
