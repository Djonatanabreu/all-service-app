import { ImageSourcePropType } from 'react-native';

export interface INewsPage {
  page: number;
  totalRecords: number;
  totalDisplayRecords: number;
}

export type NewsListType = {
  id: number;
  data_cadastro: string;
  titulo: string;
  imagem: ImageSourcePropType;
  resumo: string;
  descricao: string;
  status: string;
  destaque: string;
};

export type NewsItemType = {
  titulo?: string;
  imagem?: ImageSourcePropType;
  resumo?: string;
  onPress?: () => void;
};
