// src/localization/localization.controller.ts
import { Controller, Get, Query, Param, Req } from '@nestjs/common';
import { LocalizationService } from './localization.service';

@Controller('api/v1/locale')
export class LocalizationController {
  constructor(private readonly localeService: LocalizationService) {}

  @Get('supported')
  getSupportedLocales() {
    return this.localeService.getSupportedLocales();
  }

  @Get('list')
  getLocaleList() {
    return this.localeService.getLocaleList();
  }

  @Get('current')
  getCurrentLocale(@Req() req) {
    return {
      locale: this.localeService.getCurrentLocale(),
    };
  }

  @Get('messages')
  getMessages(@Query('lang') lang?: string) {
    const locale = lang || this.localeService.getCurrentLocale();
    return this.localeService.getMessages(locale);
  }

  @Get('translate')
  translate(
    @Query('key') key: string,
    @Query() params: Record<string, any>,
    @Query('lang') lang?: string,
  ) {
    const { key: _, lang: __, ...args } = params;
    const translated = this.localeService.translate(key, args, lang);
    return {
      key,
      translated,
      lang: lang || this.localeService.getCurrentLocale(),
    };
  }

  @Get(':code')
  getLocaleInfo(@Param('code') code: string) {
    if (!this.localeService.isLocaleSupported(code)) {
      return { error: `Locale "${code}" not supported` };
    }
    return {
      code,
      name: this.localeService.getLocaleName(code),
      flag: this.localeService.getLocaleFlag(code),
      direction: this.localeService.getLocaleDirection(code),
      dateFormat: this.localeService.getDateFormat(code),
      timeFormat: this.localeService.getTimeFormat(code),
      numberFormat: this.localeService.getNumberFormat(code),
    };
  }
}