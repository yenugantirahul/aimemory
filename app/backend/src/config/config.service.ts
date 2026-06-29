import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get port(): number {
    return this.config.get<number>('app.port')!;
  }

  get jwtSecret(): string {
    return this.config.get<string>('jwt.secret')!;
  }

  get databaseUrl(): string {
    return this.config.get<string>('database.url')!;
  }
}
