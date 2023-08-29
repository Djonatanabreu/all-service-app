/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { Container, Content, ImageContent } from './styles';
import { Error, Label } from '../Input/styles';
import { Image } from 'react-native';
import ImagePicker from '../ImagePicker';
import { photo } from 'assets/img';

export interface InputImageProps {
  control: any;
  label?: string;
  error?: FieldError;
  name: string;
}
type ModalImageRef = React.ElementRef<typeof ImagePicker>;

const InputImage: React.FunctionComponent<InputImageProps> = ({
  control,
  label,
  error,
  name,
}) => {
  const refImagePicker = React.useRef<ModalImageRef>(null);

  return (
    <>
      <Controller
        key={name}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          let array: any = [];
          Array(4)
            .fill({})
            .map((_, index) => {
              if (value && typeof value[index] !== 'undefined') {
                array.push(value[index]);
              } else {
                array.push('');
              }
            });

          const handleOnChange = async (value: string, index?: string) => {
            array[Number(index)] = value;
            onChange(array);
          };

          return (
            <Container>
              {label && <Label>{label}</Label>}
              <Content>
                {array.map((ele: any, index: number) => (
                  <ImageContent
                    key={index}
                    onPress={() => refImagePicker.current?.open(String(index))}
                  >
                    <Image
                      style={{
                        width: ele == '' ? 30 : 80,
                        height: ele == '' ? 30 : 80,
                        borderRadius: ele == '' ? 0 : 15,
                      }}
                      resizeMode="contain"
                      source={ele == '' ? photo : { uri: ele }}
                    />
                  </ImageContent>
                ))}
              </Content>
              {error && <Error>{error.message}</Error>}
              <ImagePicker
                onSubmitPhoto={handleOnChange}
                ref={refImagePicker}
              />
            </Container>
          );
        }}
      />
    </>
  );
};

export default InputImage;
