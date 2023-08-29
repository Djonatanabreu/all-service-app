import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cidades: undefined;
  Register: undefined;
  NewsPage: {
    id: number
  }
  ForgotPassword: undefined;
  Profile: undefined;
  Profissionais: any
  ProfissionaisDetails: any
  ProfissionaisRoutes: any
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

