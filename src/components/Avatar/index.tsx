import React from 'react';
import { placeholder } from 'assets/img';
import { AvatarStyle } from './styles';

export interface AvatarProps {
  height?: number;
  width?: number;
  source?: string;
  onPress?: () => void;
}

const Avatar: React.FunctionComponent<AvatarProps> = ({
  width = 50,
  height = 50,
  onPress,
  source,
}) => {
  return (
    <AvatarStyle.Container width={width} height={height} onPress={onPress}>
      <AvatarStyle.Image
        width={width}
        height={height}
        resizeMode="contain"
        source={source ? { uri: source } : placeholder}
      />
    </AvatarStyle.Container>
  );
};

export default Avatar;
