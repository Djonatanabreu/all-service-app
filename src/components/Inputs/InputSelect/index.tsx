/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { Container } from './styles';
import RNPickerSelect from 'react-native-picker-select';
import { Error, FieldContainer, Label } from '../Input/styles';
import { defaultTheme } from 'styles/default';
import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const width = Dimensions.get('screen').width;

interface Options {
  label: any;
  value: string;
  color?: string;
}

export interface InputSelectProps {
  control: any;
  label?: string;
  error?: FieldError;
  name: string;
  gray?: boolean;
  removeRadius?: boolean;
  Icon?: any;
  items: Options[];
  placeholder?: string;
  disabled?: boolean;
}

const InputSelect: React.FunctionComponent<InputSelectProps> = ({
  control,
  label,
  gray,
  error,
  name,
  disabled,
  removeRadius,
  items = [],
  Icon,
  placeholder = '',
}) => {
  const placeholderProps = {
    label: placeholder,
    value: null,
    color: 'black',
  };

  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const handleOnChange = async (value: string) => {
          onChange(value);
        };

        return (
          <Container>
            {label && <Label>{label}</Label>}
            <FieldContainer
              removeRadius={removeRadius}
              gray={gray}
              error={!!error}
            >
              <RNPickerSelect
                placeholder={placeholderProps}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
                disabled={disabled}
                value={value}
                onValueChange={handleOnChange}
                items={items}
              />
              {!!Icon && <Icon />}
            </FieldContainer>
            {error && <Error>{error.message}</Error>}
          </Container>
        );
      }}
    />
  );
};

export default InputSelect;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    fontSize: RFValue(14),
    color: defaultTheme.input,
    width: width - 120,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 50,
    fontSize: RFValue(14),
    color: defaultTheme.input,
    width: width - 120,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
});
