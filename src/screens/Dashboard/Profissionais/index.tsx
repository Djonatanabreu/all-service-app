import React, { useEffect, useState } from 'react';
import { Props } from 'interfaces/routes.interface';
import { ContainerPage } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { View } from 'react-native';
import { useUserStore } from 'store/user';
import FlatList from 'components/FlatList';
import { Servicos } from '../Categorias';
import { ProfissionalStyle } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';

export type Profissional = {
  bairro: string;
  categoria_id: string;
  Categoria: Servicos;
  Cidade: any;
  categorias_profissionais_id: any;
  cep: string;
  cidade_id: string;
  complemento: string;
  cpf: any;
  data_cadastro: string;
  descricao: string;
  destaque: string;
  dns: string;
  email: string;
  estado_id: string;
  id: string;
  imagem: string;
  logradouro: string;
  nome: string;
  numero: string;
  senha: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  social_twitter: string;
  status: string;
  subcategoria_id: any;
  telefone: string;
  usuario_id: string;
  whatsapp: string;
  visualizacao: string;
  anos_experiencia: string;
  valor: string;
};

const Profissionais = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const company_id = useCompanyStore(state => state.company_id);
  const [totalItensPages, setTotalItensPages] = useState(0);
  const [page, setPage] = useState(1);

  const [categoria, setCategoria] = useState<any>();

  const { categoria_id, cidade_id }: any = route.params;

  console.log(categoria_id, cidade_id);

  const [order, setOrder] = useState('ASC');

  const cidade = useUserStore(state => state.cidade);

  const perPage = 20;

  const {
    control,
    setFocus,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });
  const search = watch('search');

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
      const query = {
        page: pageAxios,
        usuario_id: company_id,
        categoria_id,
        cidade_id,
        order: order,
        perPage: perPage,
        search: search,
      };

      const { data: response } = await api.get('/lista_profissionais.php', {
        params: query,
      });

      setTotalItensPages(response.totalRecords);
      setProfissionais(old =>
        nextPage ? [...old, ...response.data] : response.data
      );
      setPage(response.page);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
    }
  };

  const handleGetProfissional = async (item: any) => {
    await api.get('/profissional_visita.php', {
      params: { id: item.id },
    });
    navigation.navigate('ProfissionaisDetails', item);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: Profissional;
    index: number;
  }) => {
    return (
      <ProfissionalStyle.Content onPress={() => {}}>
        <ProfissionalStyle.Image
          source={{
            uri: `https://duotecnologia.com/app/images/profissionais/${item.imagem}`,
          }}
          resizeMode="cover"
        />
        <View style={{ width: '65%' }}>
          <ProfissionalStyle.Title>{item.nome}</ProfissionalStyle.Title>
          <ProfissionalStyle.Text>
            {item.anos_experiencia || '1 anos'} de experiência
          </ProfissionalStyle.Text>
          <ProfissionalStyle.Text>
            {item.visualizacao || 0} visitas
          </ProfissionalStyle.Text>
          <TouchableOpacity
            onPress={() => handleGetProfissional(item)}
            style={{ marginLeft: 'auto' }}
          >
            <ProfissionalStyle.ButtonText>
              Exibir perfil
            </ProfissionalStyle.ButtonText>
          </TouchableOpacity>
        </View>
      </ProfissionalStyle.Content>
    );
  };

  const { category } = useUserStore();
  console.log(category);

  useEffect(() => {
    if (route.params) {
      setCategoria(route.params);
    }
  }, [route.params]);

  useEffect(() => {
    handleFechData(false);
  }, [order, categoria, search]);

  return (
    <ContainerPage>
      <BackHeader title={categoria ? category?.nome : 'Profissionais'} />

      <FlatList
        ListHeaderComponent={
          <View style={{ gap: 15 }}>
            {/* <Input
              name="search"
              control={control}
              gray
              placeholder="Buscar Profissional"
            /> */}
            <TouchableOpacity
              onPress={() => setOrder(ord => (ord === 'ASC' ? 'DESC' : 'ASC'))}
              style={{ marginLeft: 'auto' }}
            >
              <ProfissionalStyle.ButtonText>
                {order === 'ASC' ? 'A-Z' : 'Z-A'}
              </ProfissionalStyle.ButtonText>
            </TouchableOpacity>
          </View>
        }
        getData={handleFechData}
        renderItem={renderItem}
        onLoading={isLoading}
        data={profissionais}
      />
    </ContainerPage>
  );
};

export default Profissionais;
