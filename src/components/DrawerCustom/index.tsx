import React from 'react';
import { Container, HeaderStyle } from './styles';
import {
  header,
  home,
  about,
  categorias,
  buscarProfissionais,
  sobre,
  profile,
  sair,
} from 'assets/img';
import { View } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { logout } from 'utils/functions';

const DrawerCustom = (props: any) => {
  const navigation = props.navigation;

  let routes = [
    {
      name: 'Home',
      icon: home,
      nav: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }, { name: 'CategoriasRoutes' }],
        });
        navigation.navigate('Home');
      },
    },
    {
      name: 'Meu perfil',
      icon: profile,
      nav: () => navigation.navigate('Profile'),
    },
    {
      name: 'Categorias',
      icon: categorias,
      nav: () =>
        navigation.navigate('CategoriasRoutes', {
          screen: 'Categorias',
        }),
    },
    {
      name: 'Buscar Profissional',
      icon: buscarProfissionais,
      nav: () =>
        navigation.navigate('ProfissionaisRoutes', {
          screen: 'BuscarProfissionais',
        }),
    },
    {
      name: 'Notícias',
      icon: about,
      nav: () => navigation.navigate('Noticias'),
    },
    {
      name: 'Sobre nós',
      icon: sobre,
      nav: () => navigation.navigate('AboutUs'),
    },
    {
      name: 'Sair',
      icon: sair,
      nav: () => logout(),
    },
  ];

  return (
    <Container>
      <HeaderStyle.Title>É Profissional ou Empresa?</HeaderStyle.Title>
      <HeaderStyle.Content>
        <HeaderStyle.Img source={header} />
      </HeaderStyle.Content>
      <HeaderStyle.Center>
        {routes.map(el => (
          <HeaderStyle.Item key={el.name} onPress={() => el.nav()}>
            <View
              style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={el.icon}
                style={{ width: 18, height: 30 }}
                resizeMode="contain"
              />
            </View>
            <HeaderStyle.Name>{el.name}</HeaderStyle.Name>
          </HeaderStyle.Item>
        ))}
      </HeaderStyle.Center>
      <HeaderStyle.Footer>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.app.duotecnologia.com/aplicativo/politica-de-privacidade-15/'
            )
          }
        >
          <HeaderStyle.Text>Política de privacidade</HeaderStyle.Text>
        </TouchableOpacity>
      </HeaderStyle.Footer>
    </Container>
  );
};

export default DrawerCustom;
