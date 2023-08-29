import React from 'react';
import { FlatListComponent, TextEmpty } from './styles';
import { RefreshControl } from 'react-native';
import { defaultTheme } from 'styles/default';

export interface FlatListProps {
  data?: any[];
  onLoading: boolean;
  getData: (pagination: boolean) => void;
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
  textEmpty?: string;
  spinnerColor?: string;
  numColumns?: number;
  ListFooterComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
}

const FlatList: React.FunctionComponent<FlatListProps> = ({
  spinnerColor = defaultTheme.primary,
  textEmpty = 'Nenhum item disponível',
  getData,
  onLoading,
  data = [],
  numColumns,
  renderItem,
  ListFooterComponent = <></>,
  ListHeaderComponent = <></>,
}) => {
  return (
    <FlatListComponent
      data={data}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            getData && getData(false);
          }}
          refreshing={onLoading}
          colors={[spinnerColor]}
          tintColor={spinnerColor}
        />
      }
      numColumns={numColumns}
      ListHeaderComponent={ListHeaderComponent}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        getData && getData(true);
      }}
      keyExtractor={(item: any) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={() =>
        !onLoading ? <TextEmpty>{textEmpty}</TextEmpty> : <></>
      }
      ListFooterComponent={ListFooterComponent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FlatList;
