/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { memo, useCallback } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { Container, Error, FieldContainer, Label } from './styles';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Dimensions, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { defaultTheme } from 'styles/default';

interface Options {
  id: string;
  title: string;
}

export interface InputProps {
  control: any;
  label?: string;
  error?: FieldError;
  name: string;
  Icon?: any;
  defaultValue?: string;
  loading?: boolean;
  removeBorder?: boolean;
  onChangeText?: (search?: string) => {};
  placeholder?: string;
  items: Options[];
}

export const InputAutocomplete: React.FunctionComponent<InputProps> = memo(
  ({
    control,
    label,
    error,
    name,
    onChangeText,
    defaultValue,
    items,
    loading = false,
    removeBorder,
    Icon,
    placeholder,
  }) => {
    const dropdownController: any = React.useRef(null);

    React.useEffect(() => {
      if (defaultValue) {
        dropdownController.current.setItem(defaultValue);
      }
    }, [defaultValue]);

    return (
      <Controller
        key={name}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const handleOnChange = async (option: Options) => {
            onChange(option.id);
          };

          const onChangeTextValue = async (value?: string) => {
            if (onChangeText) {
              onChangeText(value);
            }

            if (!value) onChange(undefined);
          };

          return (
            <Container>
              {label && <Label>{label}</Label>}
              <FieldContainer gray removeBorder={removeBorder} error={!!error}>
                <AutocompleteDropdown
                  direction={Platform.select({ ios: 'down' })}
                  // showChevron={false}
                  closeOnBlur={false}
                  controller={controller => {
                    dropdownController.current = controller;
                  }}
                  useFilter={false}
                  loading={loading}
                  onChangeText={onChangeTextValue}
                  debounce={600}
                  initialValue={value}
                  inputHeight={45}
                  textInputProps={{
                    placeholder: placeholder,
                    placeholderTextColor: '#A8A8A8',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                      color: '#737373',
                      fontWeight: '400',
                      fontSize: 18,
                    },
                  }}
                  onClear={() => onChangeTextValue()}
                  containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                  inputContainerStyle={{
                    backgroundColor: 'transparent',
                  }}
                  onSelectItem={(item: any) => item && handleOnChange(item)}
                  dataSet={items}
                  suggestionsListMaxHeight={
                    Dimensions.get('window').height * 0.4
                  }
                  ChevronIconComponent={
                    <FontAwesome5
                      name="chevron-down"
                      size={25}
                      color={defaultTheme.secondary}
                    />
                  }
                />
                {!!Icon && <Icon />}
              </FieldContainer>
              {error && <Error>{error.message}</Error>}
            </Container>
          );
        }}
      />
    );
  }
);
