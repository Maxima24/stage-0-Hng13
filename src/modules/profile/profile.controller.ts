import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const RATE_LIMIT = Number(configService.get('RATE_LIMIT')!) || 5;
const RATE_LIMIT_MS = Number(configService.get('RATE_LIMIT_MS')!) || 60000;

@Controller('/me')
export class ProfileController {
    
  constructor(private readonly profileService: ProfileService) {}

  @Throttle({ default: { limit: RATE_LIMIT, ttl: RATE_LIMIT_MS } })
  @Get()
  async getProfile() {
    const profile = await this.profileService.get();
    return profile;
  }
}
