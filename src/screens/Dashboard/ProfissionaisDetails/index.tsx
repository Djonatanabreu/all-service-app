import React, { useEffect, useState } from 'react';

import { Props } from 'interfaces/routes.interface';
import { Column, ContainerPage, ContentScroll, Row } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { RefreshControl, View, useWindowDimensions } from 'react-native';
import { PageStyle } from './styles';
import RenderHTML from 'react-native-render-html';
import { Profissional } from '../Profissionais';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { masks } from 'utils/masks';
import api from 'services/api';
import { ActivityIndicator } from 'react-native';
import { defaultTheme } from 'styles/default';

const ProfissionaisDetails = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  const [imagens, setImagens] = useState([]);
  const [newDetails, setNewDetails] = useState<Profissional>();

  const handleGetphotos = async ({ id }: { id: string }) => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/busca_profissional.php', {
        params: { id },
      });

      setImagens(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (route.params) {
      setNewDetails(route.params);
      handleGetphotos(route.params);
      setIsLoading(false);
    }
  }, [route]);

  return (
    <ContainerPage>
      <BackHeader />
      <ContentScroll
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
        }
      >
        {!isLoading && newDetails && (
          <PageStyle.Content>
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                flex: 1,
                marginBottom: 30,
              }}
            >
              <PageStyle.ViewBackground />
              <PageStyle.Cover
                resizeMode="cover"
                source={{
                  uri: `https://duotecnologia.com/app/images/categorias/${newDetails?.Categoria.imagem}`,
                }}
              />
              <PageStyle.Image
                resizeMode="cover"
                style={{
                  borderWidth: 5,
                  borderColor: '#ffffff',
                }}
                source={{
                  uri: `https://duotecnologia.com/app/images/profissionais/${newDetails?.imagem}`,
                }}
              />
            </View>
            <Column style={{ gap: 1 }}>
              <PageStyle.Title>{newDetails?.nome}</PageStyle.Title>
              <PageStyle.Label>{newDetails?.Cidade.nome}</PageStyle.Label>
              <PageStyle.CategorieTitle>
                {newDetails?.Categoria.nome}
              </PageStyle.CategorieTitle>
            </Column>
            <Column style={{ gap: 0, paddingHorizontal: 25 }}>
              <Row
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <PageStyle.Box>
                  <PageStyle.Label>Anos de experiência</PageStyle.Label>
                  <PageStyle.CategorieTitle>
                    {newDetails?.anos_experiencia}
                  </PageStyle.CategorieTitle>
                </PageStyle.Box>
                <PageStyle.Box>
                  <PageStyle.Label>Visitas</PageStyle.Label>
                  <PageStyle.CategorieTitle>
                    {newDetails?.visualizacao || 0}
                  </PageStyle.CategorieTitle>
                </PageStyle.Box>
                <PageStyle.Box>
                  <PageStyle.Label>Valor</PageStyle.Label>
                  <PageStyle.CategorieTitle>
                    {newDetails?.valor.replace('.', ',')}
                  </PageStyle.CategorieTitle>
                </PageStyle.Box>
              </Row>
              <PageStyle.ButtonWhats
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Olá&phone=+55${masks.unmask(
                      newDetails?.whatsapp
                    )}`
                  )
                }
              >
                <PageStyle.ButtonLabel>Agendar Agora</PageStyle.ButtonLabel>
                <FontAwesome5 name="whatsapp" size={30} color={'white'} />
              </PageStyle.ButtonWhats>
              <PageStyle.Title
                style={{ textAlign: 'left', marginVertical: 15, marginTop: 15 }}
              >
                Sobre mim
              </PageStyle.Title>
              <RenderHTML
                contentWidth={width}
                source={{
                  html: `<div style="color: #737373;">${newDetails?.descricao}</div>`,
                }}
              />
              <PageStyle.Title
                style={{ textAlign: 'left', marginVertical: 15 }}
              >
                Fotos
              </PageStyle.Title>
              {isLoading ? (
                <ActivityIndicator
                  size={'large'}
                  color={defaultTheme.secondary}
                />
              ) : (
                <PageStyle.ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {imagens.map((el: any) => (
                    <PageStyle.Photo
                      key={el.id}
                      resizeMode="cover"
                      source={{
                        uri: `https://duotecnologia.com/app/images/profissionais/${el?.imagem}`,
                      }}
                    />
                  ))}
                </PageStyle.ScrollView>
              )}
            </Column>
          </PageStyle.Content>
        )}
      </ContentScroll>
    </ContainerPage>
  );
};

export default ProfissionaisDetails;
