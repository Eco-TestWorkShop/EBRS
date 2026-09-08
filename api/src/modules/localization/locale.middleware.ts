import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LocalizationService } from './localization.service';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  constructor(private readonly localeService: LocalizationService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Detect locale from headers
    const headerLang = req.headers['x-lang'] as string;
    const acceptLang = req.headers['accept-language'] as string;
    let locale = this.localeService.getCurrentLocale() || 'en';

    if (headerLang && this.localeService.isLocaleSupported(headerLang)) {
      locale = headerLang;
    } else if (acceptLang) {
      const [preferred] = acceptLang.split(',');
      const lang = preferred.split('-')[0];
      if (this.localeService.isLocaleSupported(lang)) {
        locale = lang;
      }
    }

    this.localeService.setCurrentLocale(locale);
    (req as any).locale = locale; // attach to request

    next();
  }
}