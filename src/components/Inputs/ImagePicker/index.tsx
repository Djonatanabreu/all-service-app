/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import DefaultModal from 'components/Modals/DefaultModal';
import { Row } from 'components/commons';
import Button from 'components/Button';
import { View } from 'react-native';
import * as ImagePickerLib from 'expo-image-picker';
import useToast from 'libs/useToast';

export interface ImagePickerProps {
  onSubmitPhoto: (uri: string, index?: string) => void;
}

export interface ImagePickerHandle {
  open: (index: string) => void;
  close: () => void;
}

type ModalDefaultRef = React.ElementRef<typeof DefaultModal>;

const ImagePicker: React.ForwardRefRenderFunction<
  ImagePickerHandle,
  ImagePickerProps
> = ({ onSubmitPhoto }, ref) => {
  const refModalDefault = React.useRef<ModalDefaultRef>(null);
  const toast = useToast();
  const [index, setIndex] = useState<string>();

  const handleOpenCamera = async () => {
    const permissionResult =
      await ImagePickerLib.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      toast.errorToast(
        'Você se recusou a permitir que este aplicativo acesse sua câmera'
      );
      return;
    }

    const result = await ImagePickerLib.launchCameraAsync();

    if (!result.canceled) {
      refModalDefault?.current?.close();

      onSubmitPhoto(result.assets[0].uri, index);
    }
  };

  const handleOpenGalery = async () => {
    const permissionResult =
      await ImagePickerLib.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      toast.errorToast(
        'Você se recusou a permitir que este aplicativo acesse sua galeria'
      );
      return;
    }

    const result = await ImagePickerLib.launchImageLibraryAsync();

    if (!result.canceled) {
      refModalDefault?.current?.close();
      onSubmitPhoto(result.assets[0].uri, index);
    }
  };

  React.useImperativeHandle(ref, () => ({
    open(index) {
      refModalDefault?.current?.open();
      setIndex(index);
    },
    close() {
      refModalDefault?.current?.close();
    },
  }));

  return (
    <DefaultModal ref={refModalDefault}>
      <Row>
        <View style={{ width: '49%' }}>
          <Button
            onPress={handleOpenCamera}
            label="Abrir Camera"
            fullWidth
            color="primary"
            variantType="block"
          />
        </View>
        <View style={{ width: '49%' }}>
          <Button
            onPress={handleOpenGalery}
            label="Galeria"
            fullWidth
            color="primary"
            variantType="block"
          />
        </View>
      </Row>
    </DefaultModal>
  );
};

export default React.forwardRef(ImagePicker);
