import { Props } from 'interfaces/routes.interface';
import { ContainerPage, Title } from 'components/commons';
import Button, { ButtonProps } from 'components/Button';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import { useUserStore } from 'store/user';
import { View } from 'react-native';
import { defaultTheme } from 'styles/default';
import { useForm } from 'react-hook-form';
import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';
import { useEffect, useState } from 'react';

export type Cidade = {
  id: number;
  nome: string;
  estado_id: number;
};

const Cidades = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [cidades, setCidades] = useState<Cidade[]>([]);

  const [cidadesRecomendada, setCidadesRecomendada] = useState<Cidade[]>([
    {
      id: 6,
      nome: 'Belo Horizonte',
      estado_id: 11,
    },
    {
      id: 7929,
      nome: 'São Paulo',
      estado_id: 23,
    },
    {
      id: 6861,
      nome: 'Rio de Janeiro',
      estado_id: 19,
    },
  ]);

  const { setCidade, cidade } = useUserStore(state => state);
  const perPage = 50;

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
    control,
    watch,
    formState: { errors },
  } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const search = watch('search');

  useEffect(() => {
    if (search) {
      setCidade(cidades.find(cid => String(cid.id) === search));
      navigation.navigate('Home');
    }
  }, [search]);

  useEffect(() => {
    handleGetCidades();
  }, []);

  const renderItem = ({
    item,
    index,
    color = 'gray',
  }: {
    item: Cidade;
    index: number;
    color?: ButtonProps;
  }) => (
    <View key={item?.id}>
      <Button
        variantType="block"
        onPress={() => {
          setCidade(item);
          navigation.navigate('Home');
        }}
        fullWidth
        color={color}
        label={item?.nome}
      />
    </View>
  );

  return (
    <ContainerPage>
      <BackHeader chevronLeft={false} title="" />
      <ContainerPage>
        <View style={{ gap: 15, paddingHorizontal: 30 }}>
          <Title>Qual a sua localização ?</Title>
          <InputAutocomplete
            placeholder={'Escolha uma cidade'}
            name="search"
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
            marginHorizontal: '8%',
            flex: 1,
            flexDirection: 'column-reverse',
          }}
        >
          {renderItem({
            item: cidade ? (cidade as Cidade) : cidades[0],
            index: cidade?.id as number,
            color: 'secondaryDark',
          })}
        </View>

        <View
          style={{
            marginTop: 'auto',
            padding: 25,
            gap: 15,
          }}
        >
          <Title style={{ color: defaultTheme.secondary }}>
            Cidades mais buscadas:
          </Title>

          {cidadesRecomendada.map((cid, index) =>
            renderItem({ item: cid, index, color: 'secondary' })
          )}
        </View>
      </ContainerPage>
    </ContainerPage>
  );
};

export default Cidades;
