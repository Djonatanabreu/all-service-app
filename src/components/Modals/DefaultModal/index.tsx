import React, { ReactElement } from 'react';
import Modal from 'react-native-modal';
import { ModalStyle } from './styles';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { defaultTheme } from 'styles/default';

export interface DefaultModalProps {
  children: ReactElement;
  title?: string;
}

export interface DefaultModalHandle {
  open: () => void;
  close: () => void;
}

const DefaultModal: React.ForwardRefRenderFunction<
  DefaultModalHandle,
  DefaultModalProps
> = ({ children, title }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const hadleClose = () => {
    setIsVisible(false);
  };

  React.useImperativeHandle(ref, () => ({
    open() {
      setIsVisible(true);
    },
    close() {
      setIsVisible(false);
    },
  }));

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hadleClose}
      onBackButtonPress={hadleClose}
    >
      <ModalStyle.Container>
        <ModalStyle.Header>
          {title ? <ModalStyle.Title>{title}</ModalStyle.Title> : <View></View>}

          <TouchableOpacity onPress={hadleClose}>
            <FontAwesome5 name="times" size={25} color={defaultTheme.primary} />
          </TouchableOpacity>
        </ModalStyle.Header>
        {children}
      </ModalStyle.Container>
    </Modal>
  );
};

export default React.forwardRef(DefaultModal);
