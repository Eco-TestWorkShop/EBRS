import { Module, Global, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { LocaleMiddleware } from './locale.middleware';

@Global()
@Module({
  controllers: [LocalizationController],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocaleMiddleware).forRoutes('*');
  }
}