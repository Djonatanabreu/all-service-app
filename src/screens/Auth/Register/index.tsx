import React, { useState } from 'react';

import { Box, BoxTitle, Container } from './styles';
import { Props } from 'interfaces/routes.interface';
import { registerClientSchema, registerSchema } from 'validators/auth.schemas';
import { UserRegister } from 'interfaces/auth.interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from 'services/api';
import useToast from 'libs/useToast';
import { Column, ContentScroll, Row, TitleAuth } from 'components/commons';
import Input from 'components/Inputs/Input';
import Button from 'components/Button';
import axios from 'axios';
import { ResponseError } from 'interfaces/utils.interface';
import { useUserStore } from 'store/user';
import { useAuthStore } from 'store/auth';
import { ButtonText } from '../Login/styles';
import { Platform, TouchableOpacity } from 'react-native';
import InputSelect from 'components/Inputs/InputSelect';
import InputImage from 'components/Inputs/InputImage';

const Register = ({ route, navigation }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [estados, setEstados] = useState<any>([]);
  const [cidade, setCidade] = useState<any>([]);
  const [userType, setUserType] = useState('Profissional');
  const [categorias, setCategorias] = useState<any>([]);

  const toast = useToast();

  const handleGetState = async () => {
    try {
      const { data: response } = await api.get('/lista_estados.php', {
        params: {
          perPage: 50,
        },
      });

      setEstados(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleGetCitys = async (stateId: string) => {
    try {
      const { data: response } = await api.get('/lista_cidades.php', {
        params: {
          estado_id: stateId,
          perPage: 10000,
        },
      });

      setCidade(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleSubmitRegister = async (formData: any) => {
    try {
      setLoading(true);

      var form_data: any = new FormData();

      form_data.append('type', userType);

      for (var key in formData) {
        form_data.append(key, formData[key]);
      }

      formData.image?.map((img: string, index: number) => {
        if (img !== '') {
          form_data.append(`photo-${index}`, {
            uri: Platform.OS === 'android' ? img : img.replace('file://', ''),
            type: 'image/jpeg',
            name: `image-${index}`,
          });
        }
      });

      const { data: response } = await api.post('/cadastro.php', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      console.log(response);
      if (response.error) {
        toast.errorToast(response.error);
        return;
      }

      useUserStore.getState().setUser({ ...response.data, type: userType });
      useAuthStore.getState().setToken('token');

      toast.successToast('Registro realizado com sucesso !');
    } catch (error) {
      console.log(error);
      const typedError = error as ResponseError;
      console.log(typedError?.response?.data?.message);
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar o registro');
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<UserRegister>({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      whatsapp: '',
      estado: '',
      cidade: '',
      anos_experiencia: '',
      descricao: '',
      valor: '',
      images: [],
    },
    resolver: yupResolver(
      userType === 'Profissional' ? registerSchema : registerClientSchema
    ),
  });

  const estado = watch('estado');

  const handleGetCategories = async () => {
    try {
      setLoading(true);

      const query: any = {
        page: 1,
        perPage: 500,
      };

      query.usuario_id = 7;

      const { data: response } = await api.get('/lista_servicos.php', {
        params: query,
      });

      setCategorias(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (estado) handleGetCitys(estado);
  }, [estado]);

  React.useEffect(() => {
    handleGetState();
    handleGetCategories();
  }, []);

  return (
    <ContentScroll>
      <Container>
        <Column
          style={{
            gap: 20,
            paddingHorizontal: 20,
          }}
        >
          <TitleAuth style={{ marginTop: 15 }}>Cadastre-se</TitleAuth>
          <ButtonText style={{ fontSize: 19 }}>
            É profissional ou usuário?
          </ButtonText>

          <Row style={{ alignItems: 'center', justifyContent: 'space-around' }}>
            <Box
              active={userType === 'Profissional'}
              onPress={() => setUserType('Profissional')}
            >
              <BoxTitle>Profissional</BoxTitle>
            </Box>
            <Box
              active={userType !== 'Profissional'}
              onPress={() => setUserType('Usuário')}
            >
              <BoxTitle>Usuário</BoxTitle>
            </Box>
          </Row>

          <Input
            label="Nome completo:"
            gray
            removeRadius
            control={control}
            name="nome"
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.nome}
            blurOnSubmit={false}
            onSubmitEditing={() => setFocus('email')}
          />
          <Input
            label="E-mail:"
            control={control}
            name="email"
            gray
            removeRadius
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            error={errors.email}
            blurOnSubmit={false}
            onSubmitEditing={() => setFocus('whatsapp')}
          />
          <Input
            label="Whatsapp:"
            control={control}
            name="whatsapp"
            gray
            keyboardType="phone-pad"
            removeRadius
            mask={'cell'}
            autoCapitalize="none"
            returnKeyType="next"
            error={errors.whatsapp}
            blurOnSubmit={false}
            onSubmitEditing={() => setFocus('senha')}
          />
          <Input
            label="Senha:"
            control={control}
            name="senha"
            secure
            gray
            removeRadius
            autoCapitalize="none"
            returnKeyType="done"
            error={errors.senha}
          />
          {userType === 'Profissional' && (
            <>
              <Row>
                <InputSelect
                  items={estados.map((estado: any) => ({
                    label: estado.nome,
                    value: estado.id,
                  }))}
                  gray
                  removeRadius
                  control={control}
                  label="Estado:"
                  name="estado"
                  error={errors.estado}
                />
                <InputSelect
                  items={cidade.map((estado: any) => ({
                    label: estado.nome,
                    value: estado.id,
                  }))}
                  gray
                  removeRadius
                  control={control}
                  label="Cidade:"
                  error={errors.cidade}
                  name="cidade"
                />
              </Row>

              <InputSelect
                items={categorias.map((estado: any) => ({
                  label: estado.nome,
                  value: estado.id,
                }))}
                gray
                removeRadius
                control={control}
                label="Categoria:"
                error={errors.categoria_id}
                name="categoria_id"
              />
              <Input
                label="Tempo de experiência:"
                control={control}
                name="anos_experiencia"
                gray
                removeRadius
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="number-pad"
                error={errors.anos_experiencia}
                blurOnSubmit={false}
                onSubmitEditing={() => setFocus('valor')}
              />
              <Input
                label="Valor médio do serviço:"
                control={control}
                name="valor"
                gray
                mask={'currency'}
                keyboardType="number-pad"
                removeRadius
                autoCapitalize="none"
                returnKeyType="next"
                error={errors.valor}
                blurOnSubmit={false}
                onSubmitEditing={() => setFocus('descricao')}
              />
              <Input
                label="Descrição:"
                control={control}
                name="descricao"
                gray
                multiline
                removeRadius
                returnKeyType="done"
                error={errors.descricao}
              />

              <InputImage
                label="Fotos do serviço prestado:"
                control={control}
                name="image"
              />
            </>
          )}

          <Button
            onPress={handleSubmit(handleSubmitRegister)}
            label="Cadastrar"
            loading={loading}
            fullWidth
            color="secondaryDark"
            variantType="block"
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ButtonText>Voltar</ButtonText>
          </TouchableOpacity>
        </Column>
      </Container>
    </ContentScroll>
  );
};

export default Register;
