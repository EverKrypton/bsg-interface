import { ThemeUICSSObject, ThemeUIStyleObject } from 'theme-ui';

export const MEDIA_WIDTHS = {
  uptoExtraExtraSmall: 425,
  upToExtraSmall: 785,
  upToSmall: 786,
  upToMedium: 1024,
  upToLarge: 1280,
  upToExtraLarge: 1440,
};

export const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (memo, size) => {
    memo[size] = (args: ThemeUICSSObject) => ({
      [`@media (max-width: ${MEDIA_WIDTHS[size]}px)`]: args,
    });
    return memo;
  },
  {} as {
    [width in keyof typeof MEDIA_WIDTHS]: (args: ThemeUICSSObject) => ThemeUIStyleObject;
  },
);
