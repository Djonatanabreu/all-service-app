import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import DefaultModal from 'components/Modals/DefaultModal';
import { Column } from 'components/commons';
import Input from 'components/Inputs/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from 'validators/user.schemas';
import { UserChangePassword, UserUpdate } from 'interfaces/user.interface';
import api from 'services/api';
import useToast from 'libs/useToast';
import { ResponseError } from 'interfaces/utils.interface';
import axios from 'axios';
import Button from 'components/Button';

export interface ChangePasswordProps {}

export interface ChangePasswordHandle {
  open: () => void;
  close: () => void;
}

type ModalDefaultRef = React.ElementRef<typeof DefaultModal>;

const ChangePassword: React.ForwardRefRenderFunction<
  ChangePasswordHandle,
  ChangePasswordProps
> = (_, ref) => {
  const refModalDefault = useRef<ModalDefaultRef>(null);

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmitUpdate = async (formData: UserChangePassword) => {
    try {
      setLoading(true);

      await api.put('/users/me', {
        password: formData.password,
      });

      toast.successToast('Senha editada com sucesso !');
    } catch (error) {
      const typedError = error as ResponseError;
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar a troca');
      }
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open() {
      refModalDefault?.current?.open();
    },
    close() {
      refModalDefault?.current?.open();
    },
  }));

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<UserChangePassword>({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(changePasswordSchema),
  });

  return (
    <DefaultModal title="Trocar Senha" ref={refModalDefault}>
      <Column>
        <Input
          label="Senha"
          control={control}
          name="password"
          secure
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => setFocus('confirm_password')}
          error={errors.password}
        />
        <Input
          label="Confirmar Senha"
          control={control}
          secure
          name="confirm_password"
          autoCapitalize="none"
          returnKeyType="done"
          error={errors.confirm_password}
        />

        <Button
          onPress={handleSubmit(handleSubmitUpdate)}
          label="Salvar"
          loading={loading}
          fullWidth
          color="primary"
          variantType="block"
        />
      </Column>
    </DefaultModal>
  );
};

export default forwardRef(ChangePassword);
