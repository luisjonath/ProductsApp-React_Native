import React, { useState } from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {Product} from '../../../domain/entities/product';
import {Layout, List} from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  products: Product[];
  fetchNextPage: () => void
}

export const ProductList = ({products, fetchNextPage}: Props) => {

const [isRefreshing, setIsRefreshing] = useState(false)

const queryClient = useQueryClient()

  const onPullToRefresh = async() => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 200))
    queryClient.invalidateQueries({queryKey: ["products", "infinite"]})

    setIsRefreshing(false)
  }

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item}/>}

      ListFooterComponent={() => <Layout style={{height: 150}}/>}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh}/>}
    />
  );
};
