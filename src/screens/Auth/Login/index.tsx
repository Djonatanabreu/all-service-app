import React, { useState } from 'react';

import { BackgroundAuth, ButtonText, Container, ImageAuth } from './styles';
import { Props } from 'interfaces/routes.interface';
import { loginSchema } from 'validators/auth.schemas';
import { UserLogin } from 'interfaces/auth.interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from 'services/api';
import useToast from 'libs/useToast';
import { Column, ContentScroll, TitleAuth } from 'components/commons';
import Input from 'components/Inputs/Input';
import Button from 'components/Button';
import { useUserStore } from 'store/user';
import { useAuthStore } from 'store/auth';
import { ResponseError } from 'interfaces/utils.interface';
import axios from 'axios';
import { bannerAuth, email, logoauth, password } from 'assets/img';
import { TouchableOpacity, View } from 'react-native';

const Login = ({ route, navigation }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleSubmitLogin = async (formData: UserLogin) => {
    try {
      setLoading(true);

      const { data: response } = await api.post('/login.php', formData);
      console.log(response);

      if (response.error) {
        toast.errorToast(response.error);
        return;
      }

      useUserStore.getState().setUser(response.data);
      useAuthStore.getState().setToken(response.token);

      toast.successToast('Login realizado com sucesso !');
    } catch (error) {
      console.log(error);

      const typedError = error as ResponseError;
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar o login');
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: yupResolver(loginSchema),
  });

  return (
    <Container>
      <BackgroundAuth source={bannerAuth} resizeMode="contain" />
      <ImageAuth source={logoauth} />
      <ContentScroll style={{ marginTop: 150 }}>
        <Column style={{ paddingHorizontal: 50, gap: 25 }}>
          <TitleAuth>Login</TitleAuth>
          <Input
            control={control}
            name="email"
            autoCapitalize="none"
            placeholder="Email"
            Icon={email}
            keyboardType="email-address"
            returnKeyType="next"
            error={errors.email}
            blurOnSubmit={false}
            onSubmitEditing={() => setFocus('senha')}
          />
          <Input
            control={control}
            secure
            Icon={password}
            placeholder="Senha"
            name="senha"
            autoCapitalize="none"
            returnKeyType="done"
            error={errors.senha}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <ButtonText>Esqueci minha senha</ButtonText>
          </TouchableOpacity>
          <Button
            onPress={handleSubmit(handleSubmitLogin)}
            label="Logar"
            loading={loading}
            fullWidth
            color="secondaryDark"
            variantType="block"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <ButtonText style={{ fontSize: 18 }}>
              Não possui conta? Cadastre-se agora!
            </ButtonText>
          </TouchableOpacity>
          <ButtonText style={{ fontSize: 16, marginTop: 50 }}>
            Faça login para acessar todos os recursos do aplicativo
          </ButtonText>
        </Column>
      </ContentScroll>
    </Container>
  );
};

export default Login;
