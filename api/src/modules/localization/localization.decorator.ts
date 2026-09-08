import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export const CurrentLocale = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return I18nContext.current()?.lang || 'en';
  },
);