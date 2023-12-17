import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.dataSource.getRepository(User).findOneBy({
        email: email,
      });

      if (user) {
        const match = await bcrypt.compare(pass, user?.password);

        if (match) {
          const payload = { sub: user.id, email: user.email, name: user.name };

          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        } else {
          throw new UnauthorizedException();
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
