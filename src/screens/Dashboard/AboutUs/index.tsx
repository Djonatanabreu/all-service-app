import React, { useEffect, useState } from 'react';

import { Props } from 'interfaces/routes.interface';
import { ContainerPage, ContentScroll, Line, Title } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import {
  Image,
  ImageSourcePropType,
  RefreshControl,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { PageStyle } from './styles';
import { ImageAuth } from 'screens/Auth/Login/styles';
import { logoauth } from 'assets/img';

export type Sobre = {
  id: number;
  descricao: string;
  titulo: string;
  imagem: ImageSourcePropType;
};

const Canais = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  const company_id = useCompanyStore(state => state.company_id);
  const [about, setAbout] = useState<any>();

  const handleGetDetails = async () => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_sobre.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setAbout(response[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetails();
  }, []);

  return (
    <ContainerPage>
      <BackHeader title="Sobre nós" />
      <ContentScroll
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
        }
      >
        {!isLoading && about && (
          <PageStyle.Content>
            <View style={{ flex: 1, height: 300, alignItems: 'center' }}>
              <Image
                source={logoauth}
                resizeMode="contain"
                style={{ width: 200, height: 200 }}
              />
            </View>
            <RenderHTML
              contentWidth={width}
              source={{
                html: `<div style="color: #737373;">${about?.descricao}</div>`,
              }}
            />
          </PageStyle.Content>
        )}
      </ContentScroll>
    </ContainerPage>
  );
};

export default Canais;
