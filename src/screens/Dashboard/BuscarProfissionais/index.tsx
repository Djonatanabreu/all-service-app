// import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';
// import { ContainerPage, Title } from 'components/commons';
// import { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import BackHeader from 'screens/_headers/Back';
// import { Cidade } from '../Cidades';
// import api from 'services/api';
// import { useUserStore } from 'store/user';
// import { useForm } from 'react-hook-form';

// const BuscarProfissionais = () => {
//   const [isLoading, setIsLoading] = useState<boolean>();
//   const [page, setPage] = useState(1);
//   const [cidades, setCidades] = useState<Cidade[]>([]);

//   const { setCidade, cidade } = useUserStore(state => state);
//   const perPage = 50;

//   const handleGetCidades = async (searchValue?: string) => {
//     try {
//       setIsLoading(true);

//       const { data: response } = await api.get('/lista_cidades.php', {
//         params: {
//           page: page,
//           perPage: perPage,
//           termo_busca: searchValue,
//         },
//       });

//       setCidades(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//     } finally {
//     }
//   };

//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<{ search: string }>({
//     defaultValues: {
//       search: '',
//     },
//   });

//   const search = watch('search');

//   useEffect(() => {
//     if (search) {
//       // setCidade(cidades.find(cid => String(cid.id) === search));
//       // navigation.navigate('Home');
//     }
//   }, [search]);

//   console.log({ cidades, cidade });

//   useEffect(() => {
//     handleGetCidades();
//   }, []);

//   return (
//     <ContainerPage>
//       <BackHeader title={'Buscar Profissionais'} />

//       <View style={{ gap: 15, paddingHorizontal: 30 }}>
//         <Title>Qual a sua localização ?</Title>
//         <InputAutocomplete
//           placeholder={'Escolha uma cidade'}
//           name="search"
//           loading={isLoading}
//           onChangeText={handleGetCidades}
//           items={cidades.map((sug: any) => ({
//             id: sug.id,
//             title: `${sug.nome} - ${sug.Estado.sigla}`,
//           }))}
//           control={'control'}
//         />
//       </View>
//     </ContainerPage>
//   );
// };

// export default BuscarProfissionais;

// ------------------

import { Props } from 'interfaces/routes.interface';
import { ContainerPage, ContentScroll, Title } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import { useUserStore } from 'store/user';
import { View, useWindowDimensions } from 'react-native';
import { useForm } from 'react-hook-form';
import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';
import { useEffect, useState } from 'react';
import { useCompanyStore } from 'store/company';
import Button from 'components/Button';

export type Cidade = {
  id: number;
  nome: string;
  estado_id: number;
};

export interface ICategoryProps {
  id: number;
  nome: string;
  imagem?: string;
  categoria_id?: number;
}

const BuscarProfissionais = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [categoryList, setCategoryList] = useState<ICategoryProps[]>([]);

  const { width, height } = useWindowDimensions();

  const company_id = useCompanyStore(state => state.company_id);

  const { setCategories, category } = useUserStore(state => state);

  const { setCidade, cidade } = useUserStore(state => state);
  const perPage = 50;

  const handleFetchData = async (searchValue?: string) => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_servicos.php', {
        params: {
          page: page,
          usuario_id: company_id,
          perPage: perPage,
          termo_busca: searchValue,
        },
      });

      setCategoryList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleGetCidades = async (searchValue?: string) => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_cidades.php', {
        params: {
          page: page,
          perPage: perPage,
          termo_busca: searchValue,
        },
      });

      setCidades(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const {
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm<{ categoria: string; cidade: string }>({
    defaultValues: {
      cidade: '',
      categoria: '',
    },
  });

  const searchCidade = watch('cidade');

  useEffect(() => {
    if (searchCidade) {
      setCidade(cidades.find(cid => String(cid.id) === searchCidade));
    }
  }, [searchCidade]);

  const searchCategoria = watch('categoria');

  useEffect(() => {
    if (searchCategoria) {
      setCategories(
        categoryList.find(categoria => String(categoria.id) === searchCategoria)
      );
    }
  }, [searchCategoria]);

  useEffect(() => {
    handleGetCidades();
    handleFetchData();
  }, []);

  console.log(getValues().cidade);

  return (
    <ContainerPage>
      <BackHeader title={'Buscar Profissionais'} />
      <ContentScroll>
        <View
          style={{
            gap: 15,
            paddingHorizontal: 30,
            marginVertical: width * 0.1,
          }}
        >
          <Title>Alterar localização </Title>
          <InputAutocomplete
            placeholder={'Escolha uma cidade'}
            name="cidade"
            loading={isLoading}
            onChangeText={handleGetCidades}
            items={cidades.map((sug: any) => ({
              id: sug.id,
              title: `${sug.nome} - ${sug.Estado.sigla}`,
            }))}
            control={control}
          />
        </View>
        <View
          style={{
            gap: 15,
            paddingHorizontal: 30,
          }}
        >
          <Title> Tipo de Profissional </Title>
          <InputAutocomplete
            placeholder={'Escolha a categoria'}
            name="categoria"
            loading={isLoading}
            onChangeText={handleFetchData}
            items={categoryList.map((slug: any) => ({
              id: slug.id,
              title: slug.nome,
            }))}
            control={control}
          />
        </View>

        <View
          style={{
            height: 120,
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: '25%',
            justifyContent: 'space-around',
            marginTop: width * 0.1,
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate('Profissionais', {
                cidade_id: getValues().cidade,
                categoria_id: getValues().categoria,
              })
            }
            label="Buscar"
            loading={false}
            color="secondaryDark"
            variantType="block"
            fullWidth
          />
        </View>
      </ContentScroll>
    </ContainerPage>
  );
};

export default BuscarProfissionais;
