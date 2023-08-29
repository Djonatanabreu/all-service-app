import React, { useEffect, useState } from 'react';

import { ContainerPage, ContentScroll, Title } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import {
  ImageSourcePropType,
  RefreshControl,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { PageStyle } from './styles';
import { NewsListType } from './Types';
import { FlatList } from 'react-native-gesture-handler';
import NewsItem from './NewsItem';

const Noticias = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsList, setNewsList] = useState<NewsListType[]>([]);
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();

  const company_id = useCompanyStore(state => state.company_id);

  const handleGetNews = async () => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_noticias.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setNewsList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetNews();
  }, []);

  const onHandleNews = (id: number) => {
    newsList.map(news => {
      if (news.id === id) {
        // TODO: NAVIGATE TO NEWSDETAILS
        navigation.navigate('NewsDetail', {
          titulo: news.titulo,
          imagem: `https://duotecnologia.com/app/images/noticias/${news.imagem}`,
          descricao: news.descricao,
          resumo: news.resumo,
        });
      }
    });
  };

  return (
    <ContainerPage style={{ paddingHorizontal: width * 0.08 }}>
      <BackHeader title="Notícias" />
      <ContentScroll
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              // TODO: REFRESH THE PAGE
            }}
          />
        }
      >
        {!isLoading && (
          <PageStyle.Content>
            <View
              style={{
                flex: 1,
                height: height * 0.25,
              }}
            >
              {newsList.map(news =>
                news.destaque === '1' ? (
                  <TouchableOpacity
                    key={news.id}
                    onPress={() => onHandleNews(news.id)}
                  >
                    <PageStyle.NewsImage
                      style={{
                        width: width * 0.8,
                        height: height * 0.22,
                        alignSelf: 'center',
                      }}
                      source={{
                        uri: `https://duotecnologia.com/app/images/noticias/${news.imagem}`,
                      }}
                    />
                    <PageStyle.SeeMore>VEJA MAIS...</PageStyle.SeeMore>
                  </TouchableOpacity>
                ) : null
              )}
            </View>
            <FlatList
              data={newsList}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <NewsItem
                  onPress={() => onHandleNews(item.id)}
                  titulo={item.titulo}
                  imagem={
                    `https://duotecnologia.com/app/images/noticias/${item.imagem}` as ImageSourcePropType
                  }
                />
              )}
            />
          </PageStyle.Content>
        )}
      </ContentScroll>
    </ContainerPage>
  );
};

export default Noticias;
