import { RFValue } from 'react-native-responsive-fontsize';
const primary = '#F79586';
const secondary = '#EA1E0E';
export interface DefaultTheme {
  primary: string;
  secondary: string;
  text: string;
  border: string;
  header: string;
  background: string;
  input: string;
  error: string;
  success: string;
  placeholder: string;
  warning: string;
  buttons: {
    secondaryDark: {
      foreground: string;
      background: string;
    };
    linear: {
      foreground: string;
      background: string;
    };
    gray: {
      foreground: string;
      background: string;
    };
    primary: {
      foreground: string;
      background: string;
    };
    secondary: {
      foreground: string;
      background: string;
    };
    danger: {
      foreground: string;
      background: string;
    };
    success: {
      foreground: string;
      background: string;
    };
    warning: {
      foreground: string;
      background: string;
    };
  };
  fonts: {
    size: {
      10: string;
      12: string;
      14: string;
      15: string;
      16: string;
      18: string;
      20: string;
      22: string;
      26: string;
      30: string;
    };
  };
}

export const defaultTheme: DefaultTheme = {
  primary,
  secondary: secondary,
  text: 'gray' || 'black',
  border: secondary,
  background: '#FFFFFF',
  error: '#FF5630',
  header: primary,
  input: '#7A869A',
  success: '#20A612',
  warning: '#FF8F35',
  placeholder: '#E2E2E2',
  buttons: {
    secondaryDark: {
      foreground: '#FFFFFF',
      background: secondary,
    },
    linear: {
      foreground: '#FFFFFF',
      background: '#FFFFFF',
    },
    gray: {
      foreground: '#737373',
      background: '#E2E2E2',
    },
    primary: {
      foreground: '#FFFFFF',
      background: primary,
    },
    secondary: {
      foreground: secondary,
      background: '#EDEDED',
    },
    danger: {
      foreground: '#FFFFFF',
      background: '#F93B31',
    },
    success: {
      foreground: '#FFFFFF',
      background: '#35c75a',
    },
    warning: {
      foreground: '#FFFFFF',
      background: '#FDCC01',
    },
  },
  fonts: {
    size: {
      10: `${RFValue(10)}px`,
      12: `${RFValue(12)}px`,
      14: `${RFValue(14)}px`,
      15: `${RFValue(15)}px`,
      16: `${RFValue(16)}px`,
      18: `${RFValue(18)}px`,
      20: `${RFValue(20)}px`,
      22: `${RFValue(22)}px`,
      26: `${RFValue(26)}px`,
      30: `${RFValue(30)}px`,
    },
  },
};
