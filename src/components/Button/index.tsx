import React from 'react';
import { Container, ContainerLinear, Label } from './styles';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { defaultTheme } from 'styles/default';

export interface ButtonProps {
  loading?: boolean;
  label: string;
  small?: boolean;
  disabled?: boolean;
  color:
    | 'gray'
    | 'primary'
    | 'danger'
    | 'secondary'
    | 'secondaryDark'
    | 'success'
    | 'warning';
  variantType?: 'linear' | 'block' | 'outline' | 'inline';
  fullWidth?: boolean;
  onPress?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  small,
  variantType = 'block',
  disabled,
  color = 'primary',
  fullWidth = false,
  onPress,
  loading,
}) => {
  if (variantType === 'linear') {
    return (
      <TouchableOpacity onPress={onPress}>
        <ContainerLinear
          fullWidth={fullWidth}
          disabled={!!disabled}
          loading={loading}
          color={color}
          variantType={variantType}
        >
          {loading ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Label color={color} variantType={variantType}>
              {label}
            </Label>
          )}
        </ContainerLinear>
      </TouchableOpacity>
    );
  }
  return (
    <Container
      small={small}
      fullWidth={fullWidth}
      disabled={!!disabled}
      loading={loading}
      color={color}
      variantType={variantType}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          color={variantType == 'block' ? 'white' : defaultTheme.primary}
        />
      ) : (
        <Label small={small} color={color} variantType={variantType}>
          {label}
        </Label>
      )}
    </Container>
  );
};

export default Button;
