import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config"
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpConfigModule } from './modules/http/http-config.module';
import {ThrottlerGuard} from "@nestjs/throttler"
import { ProfileModule } from './modules/profile/profile.module';
import { LoggerMiddleware } from './common/middleware/middleware';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:".env"
  }),HttpConfigModule,ProfileModule, ThrottlerModule.forRoot({
      throttlers: [
        {
           ttl: Number(process.env.RATE_LIMIT_MS) || 60000,
        limit: Number(process.env.RATE_LIMIT) || 5,  
        },
      ],
    }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
