import React, { useEffect, useState } from 'react';

import { ContainerPage } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import FlatList from 'components/FlatList';
import { Image, TouchableOpacity, View } from 'react-native';
import { useUserStore } from 'store/user';
import { Label } from './styles';
import { useIsFocused } from '@react-navigation/native';

export type Servicos = {
  id: number;
  nome: string;
  imagem: string;
};

const Categorias = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [servicos, setServicos] = useState<Servicos[]>([]);
  const [totalItensPages, setTotalItensPages] = useState(0);

  const company_id = useCompanyStore(state => state.company_id);
  const cidade = useUserStore(state => state.cidade);

  const isFocused = useIsFocused();

  const perPage = 50;

  const handleFechData = async (nextPage?: boolean) => {
    try {
      let pageAxios = page;
      if (nextPage) {
        if (totalItensPages > perPage * page) {
          pageAxios += 1;
        } else {
          return;
        }
      }
      setIsLoading(true);

      const { data: response } = await api.get('/lista_servicos.php', {
        params: {
          page: pageAxios,
          usuario_id: company_id,
          perPage: perPage,
        },
      });

      setTotalItensPages(response.totalRecords);
      setServicos(old =>
        nextPage ? [...old, ...response.data] : response.data
      );

      setPage(response.page);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const renderItem = ({ item, index }: { item: Servicos; index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoriasRoutes', {
            screen: 'Profissionais',
            params: item,
          });
        }}
        style={{ width: '48%', marginRight: 15, marginBottom: 25 }}
      >
        <Image
          style={{ height: 100, width: '100%', borderRadius: 5 }}
          source={{
            uri: `https://duotecnologia.com/app/images/categorias/${item.imagem}`,
          }}
          resizeMode="contain"
        />
        <Label>{item.nome}</Label>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (isFocused) {
      handleFechData();
    }
  }, [cidade]);

  return (
    <ContainerPage>
      <BackHeader title="Categorias" />

      <FlatList
        numColumns={2}
        getData={handleFechData}
        renderItem={renderItem}
        onLoading={isLoading}
        data={servicos}
      />
    </ContainerPage>
  );
};

export default Categorias;
