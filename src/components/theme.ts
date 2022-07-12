import { Theme } from 'theme-ui';
import { mix } from '@theme-ui/color';

const theme = (function () {
  const customTheme = {
    config: {
      initialColorModeName: 'dark',
      printColorModeName: 'light',
      useBorderBox: true,
      useColorSchemeMediaQuery: false,
    },
    breakpoints: ['480px', '768px', '1024px', '1280px'],
    fonts: {
      body: '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      heading:
        '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      monospace:
        '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    },
    fontSizes: [12, 16, 20, 28, 40, 48, 60],
    fontWeights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: ['20px', '24px', '28px', '32px', '48px', '56px', '72px'],
    text: {
      default: {
        fontFamily: 'body',
        fontWeight: 'regular',
        fontSize: 1,
        lineHeight: 1,
      },
      caps: {
        fontFamily: 'body',
        fontWeight: 'regular',
        fontSize: 0,
        lineHeight: 0,
        textTransform: 'uppercase',
      },
      heading: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        fontSize: 2,
        lineHeight: 2,
      },
      subtitle: {
        variant: 'text.caps',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      caps100: {
        variant: 'text.caps',
        textTransform: 'none',
      },
      caps101: {
        fontFamily: 'unset',
        fontWeight: '1000',
        textTransform: 'uppercase',
        // letterSpacing: '0.2em',
      },
      caps200: {
        variant: 'text.caps',
        fontWeight: 'medium',
        textTransform: 'none',
      },
      caps300: {
        variant: 'text.caps',
        fontWeight: 'bold',
        textTransform: 'none',
      },
      body100: {
        variant: 'text.default',
      },
      body200: {
        variant: 'text.default',
        fontWeight: 'medium',
      },
      body300: {
        variant: 'text.default',
        fontWeight: 'bold',
      },
    },

    colors: {
      text: '#FFFFFF', // white.400
      bg: {
        //bg1: '#0f0e13',
        //   backgroundImage: {
        //     'radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%)',
        //     'radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%)',
        //     'radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%)'
        // },
      },
      background: '#0f0e13', // dark.400,
      gradient: 'radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%)',
      gradient2: 'radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%)',
      gradient3: 'radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%)',
      1: '#3BEBCE',
      2: '#18EBFB',
      3: '#14C7E6',
      4: '#247CFF',
      5: '#123FF9',
      6: '#8261F3',
      7: '#E26CFF',
      mint: {
        transparent: 'rgba(31, 200, 213, 0.3)',
        '100': 'rgba(203, 251, 255, 1)',
        '200': 'rgba(167, 249, 255, 1)',
        '300': 'rgba(24, 235, 251, 1)',
        '400': 'rgba(0, 184, 198, 1)',
        '500': 'rgba(20, 127, 135, 1)',
        '600': '#5EEAD4',
        // "gradient":
        //   "linear-gradient(236.05deg, #18EBFB 9.43%, #D942FF 148.53%)",
      },
      velvet: {
        transparent: 'rgba(217, 66, 255, 0.3)',
        '100': 'rgba(247, 215, 255, 1)',
        '200': 'rgba(238, 168, 255, 1)',
        '300': 'rgba(226, 108, 255, 1)',
        '400': 'rgba(217, 66, 255, 1)',
      },
      dark: {
        transparent: 'rgba(78, 83, 125, 0.3)',
        '100': '#6C6A92',
        '200': '#585587',
        '300': '#33306A',
        '400': '#0f0e13',
        '500': '#13111a',
        '600': `radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
      radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
      radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%)`,
      },
      white: {
        '100': 'rgba(231, 234, 255, 0.2)',
        '200': 'rgba(231, 234, 255, 0.4)',
        '300': 'rgba(231, 234, 255, 0.8)',
        '400': '#FFFFFF',
      },
      blue: {
        transparent: 'rgba(132, 179, 255, 0.3)',
        '100': '#F2F7FF',
        '200': '#CCDFFF',
        '300': '#92B0FF',
        '400': '#6E7BF3',
        '500': '#4859AF',
      },
      red: {
        '100': 'rgba(255, 240, 243, 1)',
        '200': 'rgba(253, 131, 131, 1)',
        '300': 'rgba(231, 44, 67, 1)',
        '400': 'rgba(179, 0, 56, 1)',
      },
      yellow: {
        gradient_1: 'linear-gradient(#FFDE1F, #ECB902)',
        '100': '#FFFCE0',
        '200': '#FFF9C2',
        '300': '#FFDA00',
        '400': '#F1C218',
      },
      green: {
        transparent: 'rgba(22, 179, 153, 0.3)',
        '100': 'rgba(231, 255, 252, 1)',
        '200': 'rgba(59, 235, 206, 1)',
        '300': 'rgba(22, 179, 153, 1)',
        '400': 'rgba(6, 136, 115, 1)',
      },
      orange: {
        '100': 'rgba(255, 237, 221, 1)',
        '200': 'rgba(255, 162, 75, 1)',
        '300': 'rgba(241, 140, 47, 1)',
        '400': 'rgba(217, 118, 27, 1)',
        transparent: 'rgba(255, 178, 108, 0.3)',
      },
    },
    radii: {
      none: 0,
      sm: 2,
      base: 4,
      md: 6,
      lg: 8,
      xl: 12,
      '2xl': 16,
      '3xl': 24,
      circle: 9999,
    },
    shadows: {
      outline: '0 0 0 1px rgba(255, 255, 255, 0.4)',
      buttonOutline: '0 0 0 3px rgba(231, 234, 255, 0.4)',
      strong: '0px 8px 70px rgba(65, 75, 115, 0.45)',
    },
    buttons: {
      primary: {
        variant: 'styles.button',
        backgroundColor: 'mint.300',
        color: 'dark.500',
        '&:not(:disabled)': {
          '&:hover, &:focus, &:active': {
            backgroundColor: 'mint.400',
            color: 'white.400',
          },
          '&:focus, &:active': {
            boxShadow: 'buttonOutline',
          },
        },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'dark.transparent',
          color: 'dark.200',
        },
      },
      secondary: {
        variant: 'styles.button',
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 1px rgba(231, 234, 255, 0.8)',
        color: 'white.400',
        '&:not(:disabled):hover': { backgroundColor: 'dark.400' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'dark.300' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          boxShadow: '0 0 0 1px rgba(231, 234, 255, 0.2)',
          color: 'white.200',
        },
      },
      error: {
        variant: 'styles.button',
        backgroundColor: 'red.300',
        color: 'white.400',
        '&:not(:disabled):hover': { backgroundColor: 'red.400' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'red.500' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'dark.transparent',
          color: 'white.300',
        },
      },
      //  dark: {
      //   transparent: "rgba(78, 83, 125, 0.3)",
      //   "100": "#FFFFFF",
      //   "200": "#FFFFFF",
      //   "300": "#333331",
      //   // '500': '#141313',
      //   "400": "#242322",
      //   "500": "#1c1b1b",
      // },
      // white: {
      //   "100": "rgba(231, 234, 255, 0.2)",
      //   "200": "rgba(231, 234, 255, 0.4)",
      //   "300": "rgba(231, 234, 255, 0.8)",
      //   "400": "#FFFFFF",
      // },
      ghost: {
        variant: 'styles.button',
        backgroundColor: 'transparent',
        color: 'white.400',
        '&:not(:disabled):hover': {
          backgroundColor: 'dark.300',
          color: 'white.300',
        },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'dark.300' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
          color: 'white.200',
        },
      },
      link: {
        variant: 'styles.button',
        paddingX: 0,
        height: 'initial',
        backgroundColor: 'transparent',
        color: 'mint.300',
        '&:not(:disabled):hover': { backgroundColor: 'white.100' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'white.200' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          color: 'white.200',
        },
      },
      'small-primary': {
        variant: 'buttons.primary',
        height: 40,
        paddingX: 16,
        // backgroundColor: 'mint.300',
        backgroundImage: 'linear-gradient(236.05deg, #18EBFB 9.43%, #D942FF 148.53%)',
        fontSize: 0,
        '&>svg': {
          height: 16,
          width: 16,
        },
      },
      'small-secondary': {
        variant: 'buttons.secondary',
        height: 40,
        paddingX: 16,
        fontSize: 0,
        '&>svg': {
          height: 16,
          width: 16,
        },
      },
      'small-error': {
        variant: 'buttons.error',
        px: 16,
        height: 40,
        // backgroundImage: 'linear-gradient(59deg, #ff0600 0%, #ffb400 100%);',
        fontSize: 0,
        '&>svg': {
          height: 16,
          width: 16,
        },
      },
      'small-ghost': {
        variant: 'buttons.ghost',
        height: 40,
        paddingX: 16,
        fontSize: 0,
        '&>svg': {
          height: 16,
          width: 16,
        },
      },
      'small-link': {
        variant: 'buttons.link',
        fontSize: 0,
        fontWeight: 'medium',
        '&>svg': {
          height: 16,
          width: 16,
        },
      },
      'extra-small-primary': {
        variant: 'buttons.small-primary',
        height: 28,
        paddingX: 12,
      },
      icon: {
        px: 0,
        py: 0,
        height: 28,
        width: 28,
        backgroundColor: 'transparent',
        color: 'mint.300',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&>svg': {
          height: 28,
          width: 28,
          path: {
            color: 'currentcolor',
          },
        },
        '&:hover': { backgroundColor: 'white.100' },
        '&:focus': { boxShadow: 'outline' },
        '&:active': { backgroundColor: 'white.200' },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'transparent',
          color: 'white.200',
        },
      },
      'small-icon': {
        variant: 'buttons.icon',
        height: 20,
        width: 20,
        '&>svg': {
          height: 20,
          width: 20,
          path: {
            color: 'currentcolor',
          },
        },
      },
      tab: {
        variant: 'buttons.small-ghost',
        borderRadius: 0,
        color: 'white.300',
        boxShadow: '0px 2px #444078',
        fontSize: 1,
        '&:focus': {
          boxShadow: 'none',
        },
        '&.active': {
          backgroundColor: 'transparent',
          boxShadow: '0px 2px currentColor',
          color: 'mint.300',
        },
      },
      'secondary-tab': {
        variant: 'buttons.tab',
        fontSize: 0,
        paddingX: '8px',
        height: 'unset',
        paddingY: '4px',
        fontWeight: 'normal',
        '&:focus': {
          boxShadow: 'none',
        },
        '&.active': {
          boxShadow: '0px 2px currentColor',
          color: 'mint.300',
          fontWeight: 'bold',
        },
      },
      gradient: {
        variant: 'styles.button',
        backgroundImage: 'linear-gradient(236.05deg, #ff0600 9.43%, #ffb400 148.53%);',
        // backgroundImage: 'linear-gradient(236.05deg, #18EBFB 9.43%, #D942FF 148.53%)',
        color: 'dark.500',
        '&:not(:disabled)': {
          '&:hover': {
            background:
              'linear-gradient(0deg, rgba(22, 21, 57, 0.1), rgba(22, 21, 57, 0.1)), linear-gradient(59deg, #ff0600 0%, #ffb400 100%)',
          },
          '&:active, &:focus': {
            boxShadow: 'buttonOutline',
            backgroundOrigin: 'border-box',
          },
        },
        '&:disabled,&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'dark.transparent',
          backgroundImage: 'none',
          color: 'dark.200',
        },
      },
    },
    forms: {
      switch: {
        height: 24,
        width: 40,
        backgroundColor: 'dark.transparent',
        display: 'flex',
        padding: '4px !important',
        '&>div': {
          height: 16,
          width: 16,
          backgroundColor: 'dark.300',
        },
        'input:checked ~ &': {
          backgroundColor: 'velvet.300',
          '&>div': {
            backgroundColor: 'white.400',
          },
        },
      },
      checkbox: {
        'input:checked ~ &': { color: 'velvet.300' },
        'input:focus ~ &': { boxShadow: 'outline' },
      },
      input: {
        flex: 1,
        minHeight: 24,
        fontFamily: 'body',
        fontSize: 1,
        fontWeight: 'regular',
        color: 'white.400',
        border: 'none',
        padding: '4px 12px 4px 12px !important',
        margin: '0 !important',
        outline: 'none !important',
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
        '--theme-ui-input-autofill-bg': 'transparent !important',
        '::placeholder': {
          fontFamily: 'body',
          fontSize: 1,
          fontWeight: 'regular',
          color: 'white.100',
        },
      },
    },
    styles: {
      root: {
        height: '100%',
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          maxWidth: '100%',
          width: '100vw',
          backgroundColor: '#FFFFFF',
        },
        textarea: {
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
        },
        input: {
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
        },
      },
      a: {
        color: 'blue.300',
      },
      button: {
        display: 'flex',
        flexShrink: 0,
        height: 56,
        paddingX: 24,
        paddingY: 0,
        fontFamily: 'body',
        fontSize: 1,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        borderRadius: 'lg',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        backgroundOrigin: 'border-box',
        '&>svg': {
          display: 'flex',
          verticalAlign: 'bottom',
          height: 22,
          width: 22,
          path: {
            color: 'currentcolor',
          },
        },
      },
      spinner: {
        color: 'primary',
      },
      hr: { borderColor: 'dark.400', margin: 0 },
      h1: { variant: 'text.heading', fontSize: 6, lineHeight: 6 },
      h2: { variant: 'text.heading', fontSize: 5, lineHeight: 5 },
      h3: { variant: 'text.heading', fontSize: 4, lineHeight: 4 },
      h4: { variant: 'text.heading', fontSize: 3, lineHeight: 3 },
      h5: { variant: 'text.heading', fontSize: 2, lineHeight: 2 },
      'form-input': {
        display: 'flex',
        flexDirection: 'column',
        paddingX: 0,
        height: 60,
        border: '1px solid',
        borderColor: 'dark.300',
        borderRadius: 'lg',
        pointerEvents: 'auto',
        '&>label': {
          paddingTop: '4px',
          paddingBottom: '2px',
          paddingX: 12,
          fontFamily: 'body',
          fontSize: 0,
          fontWeight: 'medium',
          lineHeight: 0,
          color: 'white.300',
        },
        '&.disabled': {
          pointerEvents: 'none',
          border: 'none',
          backgroundColor: 'dark.300',
          '&>label': { color: 'white.100' },
        },
        '&.error': { borderColor: 'red.200', '&>label': { color: 'red.200' } },
        '&:not(.error).focused': {
          borderColor: 'blue.300',
          '&>label': { color: 'blue.300' },
        },
        '&:not(.error):hover': {
          borderColor: 'blue.300',
          color: 'blue.300',
          '&>label': { color: 'blue.300' },
        },
        '&:focus-within': { boxShadow: 'outline' },
      },
      'picker-input': {
        '&.disabled': {
          pointerEvents: 'none',
          border: 'none',
          backgroundColor: 'dark.300',
          '&>label': { color: 'white.100' },
        },
        '&:.focused': {
          borderColor: 'blue.300',
          '&>label': { color: 'blue.300' },
        },
        '&:hover': {
          borderColor: 'blue.300',
          '&>label': { color: 'blue.300' },
        },
        '&:focus-within': { boxShadow: 'outline' },
      },
      row: {
        variant: 'buttons.ghost',
        color: 'white.400',
        textAlign: 'left',
        justifyContent: 'flex-start',
        paddingX: '8px',
        '&:focus': { boxShadow: 'none' },
      },
    },
    modals: {
      backdrop: {
        zIndex: 'backdrop',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(78, 83, 125, 0.3)',
        backdropFilter: 'blur(12px)',
      },
      content: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        marginTop: 16,
        justifyContent: 'flex-start',
      },
      footer: {
        display: 'flex',
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '&>button': {
          position: 'absolute',
          top: 12,
          right: 12,
          height: 32,
          width: 32,
          padding: 0,
          '&>svg': {
            height: 22,
            width: 22,
            color: 'white.100',
          },
        },
      },
      default: {
        position: 'relative',
        backgroundColor: 'dark.400',
        color: 'text',
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        marginY: 'auto',
        maxWidth: 600,
        zIndex: 'modal',
        boxShadow: 'strong',
        borderRadius: 'lg',
      },
      defaultFullScreen: {
        position: 'relative',
        backgroundColor: 'rgba(29, 29, 45, 0.9)',
        display: 'flex',
        flexDirection: `column`,
        minHeight: '100vh',
        maxHeight: '100vh',
        height: 'fill-available',
        top: 0,
        width: '100vw',
        zIndex: 'modal',
      },
      dialog: {
        varian: 'modals.default',
        padding: 64,
        paddingY: 48,
      },
      white: {
        variant: 'modals.default',
        backgroundColor: 'white.400',
        '& [title="Close"] svg': {
          color: 'dark.100',
        },
      },
    },
    alerts: {
      primary: {
        borderRadius: '8px',
        backgroundColor: 'rgba(22, 18, 72, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '8px 16px',
        minWidth: 300,
        maxWidth: 360,
        fontWeight: 400,
      },
    },
    zIndices: {
      backdrop: 100,
      modal: 110,
    },
  } as Theme;

  return customTheme;
})();

export type ExactTheme = typeof theme;

export default theme;
