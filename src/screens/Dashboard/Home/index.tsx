import { useEffect, useState } from 'react';
import HomeHeader from 'screens/_headers/Home';
import { ContainerPage, ContentScroll, Title } from 'components/commons';
import {
  ActivityIndicator,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { BannerStyle, Divulgue, NewsContent, ServiceStyle } from './styles';
import { useUserStore } from 'store/user';
import { Props } from 'interfaces/routes.interface';
import { defaultTheme } from 'styles/default';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';

export type Banner = {
  id: number;
  link: string;
  nome: string;
  imagem: ImageSourcePropType;
};

export type Service = {
  id: number;
  nome: string;
  imagem: ImageSourcePropType;
};

const Banners = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);

  const company_id = useCompanyStore(state => state.company_id);
  const cidade = useUserStore(state => state.cidade);

  const handleGetBanners = async () => {
    try {
      setIsLoading(true);

      const query: any = {
        page: 1,
        perPage: 5,
      };
      query.usuario_id = company_id;

      const { data: response } = await api.get('/lista_banners.php', {
        params: query,
      });

      if (response.data) {
        setBanners(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (company_id) {
      handleGetBanners();
    }
  }, [company_id, cidade]);

  if (isLoading)
    return (
      <View style={{ marginTop: 25 }}>
        <ActivityIndicator color={defaultTheme.secondary} size={'large'} />
      </View>
    );

  return (
    <BannerStyle.Container horizontal showsHorizontalScrollIndicator={false}>
      {banners.map(banner => (
        <BannerStyle.Card
          onPress={() => Linking.openURL(banner.link)}
          key={banner.id}
        >
          <BannerStyle.Image
            source={{
              uri: `https://duotecnologia.com/app/images/banners/${banner.imagem}`,
            }}
            resizeMode="cover"
          />
          <BannerStyle.Title>{banner.nome}</BannerStyle.Title>
        </BannerStyle.Card>
      ))}
    </BannerStyle.Container>
  );
};

const Services = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState<Service[]>([]);

  const company_id = useCompanyStore(state => state.company_id);
  const cidade = useUserStore(state => state.cidade);

  const isFocused = useIsFocused();

  const navigation: any = useNavigation();

  const handleGetNews = async () => {
    try {
      setIsLoading(true);

      const query: any = {
        page: 1,
        perPage: 5,
      };

      query.usuario_id = company_id;

      const { data: response } = await api.get('/lista_servicos.php', {
        params: query,
      });

      setService(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && company_id) {
      handleGetNews();
    }
    if (isFocused && !cidade) {
      navigation.navigate('Cidades');
    }
  }, [company_id, cidade, isFocused]);

  if (isLoading)
    return (
      <View style={{ marginTop: 25 }}>
        <ActivityIndicator color={defaultTheme.secondary} size={'large'} />
      </View>
    );

  return (
    <NewsContent>
      <ServiceStyle.Title>Qual serviço você precisa?</ServiceStyle.Title>
      <ServiceStyle.Content horizontal showsHorizontalScrollIndicator={false}>
        {service.map(newValue => (
          <ServiceStyle.Card
            onPress={() =>
              navigation.navigate('ProfissionaisRoutes', {
                screen: 'Profissionais',
                params: newValue,
              })
            }
            key={newValue.id}
          >
            <ServiceStyle.Image
              source={{
                uri: `https://duotecnologia.com/app/images/categorias/${newValue.imagem}`,
              }}
              resizeMode="cover"
            />
            <ServiceStyle.Text>{newValue.nome}</ServiceStyle.Text>
          </ServiceStyle.Card>
        ))}
      </ServiceStyle.Content>
    </NewsContent>
  );
};

const Home = ({ route, navigation }: Props) => {
  const cidade = useUserStore(state => state.cidade);
  const company_id = useCompanyStore(state => state.company_id);

  const [whats, setWhats] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const hadleGetRedes = async () => {
    try {
      const { data: response } = await api.get('/redes-socials.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setWhats(
        response.data.find((rede: any) =>
          rede.link.startsWith('https://api.whatsapp.com/')
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCategorias = async () => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_servicos.php', {
        params: {
          page: 1,
          usuario_id: company_id,
          perPage: 50,
        },
      });

      setCategorias(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    hadleGetRedes();
    handleGetCategorias();
  }, []);

  useEffect(() => {
    if (search) {
      const newValue = categorias.find((cat: any) => cat.id === search);
      navigation.navigate('ProfissionaisRoutes', {
        screen: 'Profissionais',
        params: newValue,
      });
    }
  }, [search]);

  return (
    <ContainerPage>
      <HomeHeader />
      <ContentScroll>
        <View style={{ width: '80%', paddingHorizontal: 15 }}>
          <InputAutocomplete
            name="search"
            loading={isLoading}
            placeholder="O que você procura?"
            items={categorias.map((sug: any) => ({
              id: sug.id,
              title: `${sug.nome}`,
            }))}
            control={control}
          />
        </View>
        <View style={{ gap: 30, marginVertical: 15, paddingHorizontal: 15 }}>
          {!cidade ? (
            <Title>Serviços na sua cidade.</Title>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Cidades')}>
              <Title
                style={{
                  color: defaultTheme.text,
                  paddingHorizontal: 0,
                  textAlign: 'left',
                }}
              >
                Procurando o que em{' '}
                <Title style={{ color: defaultTheme.secondary }}>
                  {cidade.nome}
                </Title>{' '}
                hoje?
              </Title>
            </TouchableOpacity>
          )}
          {!cidade && (
            <View style={{ alignItems: 'center' }}>
              <Button
                onPress={() => navigation.navigate('Cidades')}
                variantType="block"
                color="secondary"
                label={'Selecione sua cidade'}
              />
            </View>
          )}
          <Banners />
          <Services />
        </View>
        <Divulgue.Content>
          <Divulgue.Title>Divulgue seu whatsapp no Nu Biu Tem!</Divulgue.Title>
          <Divulgue.Row>
            <Divulgue.Description style={{ width: '80%' }}>
              Você é um profissional ou empresa? Cadastre-se e começe a divulgar
              seu trabalho em {cidade?.nome}.
            </Divulgue.Description>

            <TouchableOpacity
              onPress={() => Linking.openURL(whats?.link)}
              style={{ marginTop: 'auto' }}
            >
              <FontAwesome5 name="whatsapp" size={30} color={'white'} />
            </TouchableOpacity>
          </Divulgue.Row>
        </Divulgue.Content>
        <View style={{ marginBottom: 20 }} />
      </ContentScroll>
    </ContainerPage>
  );
};

export default Home;
