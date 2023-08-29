import Toast from 'react-native-toast-message';

const useToast = () => {
  const successToast = (message: string, message2?: string) => {
    Toast.show({ type: 'success', text1: message, text2: message2 });
  };

  const errorToast = (message: string) => {
    Toast.show({ type: 'error', text1: message });
  };

  return {
    successToast,
    errorToast,
  };
};

export default useToast;
