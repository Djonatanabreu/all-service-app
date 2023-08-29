/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { masks } from 'utils/masks';
import { Container, Error, Field, FieldContainer, Label } from './styles';
import { Image } from 'react-native';

export interface InputProps {
  control: any;
  label?: string;
  error?: FieldError;
  name: string;
  secure?: boolean;
  gray?: boolean;
  mask?: any;
  placeholder?: string;
  disabled?: boolean;
  blurOnSubmit?: boolean;
  multiline?: boolean;
  Icon?: any;
  removeRadius?: boolean;
  onSubmitEditing?: () => void;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  returnKeyType?:
    | 'default'
    | 'go'
    | 'google'
    | 'join'
    | 'next'
    | 'route'
    | 'search'
    | 'send'
    | 'yahoo'
    | 'done'
    | 'emergency-call';
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
}

const Input: React.FunctionComponent<InputProps> = ({
  control,
  label,
  error,
  name,
  disabled,
  gray,
  secure = false,
  placeholder = '',
  multiline = false,
  Icon,
  keyboardType = 'default',
  removeRadius = false,
  mask,
  returnKeyType = 'done',
  autoCapitalize = 'none',
  onSubmitEditing,
  blurOnSubmit = true,
}) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        const handleOnChange = async (text: string) => {
          let value = text;
          if (mask) {
            value = masks[mask](String(value));
          }
          return onChange(value);
        };

        return (
          <Container>
            {label && <Label>{label}</Label>}
            <FieldContainer multiline={multiline} removeRadius={removeRadius} gray={gray} error={!!error}>
              {
                !!Icon && <Image style={{ width: 25, height: 25}} source={Icon} />
              }
              <Field
                ref={ref}
                onBlur={onBlur}
                editable={!disabled}
                value={value}
                placeholder={placeholder}
                returnKeyType={returnKeyType}
                multiline={multiline}
                numberOfLines={4}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                onChangeText={handleOnChange}
                blurOnSubmit={blurOnSubmit}
                onSubmitEditing={onSubmitEditing}
                secureTextEntry={secure}
              />
            </FieldContainer>
            {error && <Error>{error.message}</Error>}
          </Container>
        );
      }}
    />
  );
};

export default Input;
