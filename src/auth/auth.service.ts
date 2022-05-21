import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        let result = await bcrypt.compare(String(pass), user.password);

        if (result) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    async login(user: any){
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
          };
    }
}
