import React, {useRef} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Product, Size} from '../../../domain/entities/product';
import {MyIcon} from '../../components/ui/MyIcon';
import {Formik} from 'formik';
import {updateCreateProduct} from '../../../actions/products/update-create-product';
import {Image} from 'react-native';
import { CameraAdapter } from '../../../config/adapters/camera-adapter';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];

const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.productId);

  const theme = useTheme();

  const queryClient = useQueryClient();

  const {data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      productIdRef.current = data.id;

      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['product', data.id]});
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik initialValues={product} onSubmit={mutation.mutate}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout
          title={values.title}
          subTitle={`Precio: ${values.price}`}
          rightAction={async() => {
            const photos = await CameraAdapter.getPicturesFromLibrary()

            setFieldValue("images", [...values.images, ...photos])
            
          }}
          rightActionIcon="image-outline">
          <ScrollView style={{flex: 1}}>
            {/* imagenes producto */}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {values.images.length === 0 ? (
                <Image
                  source={require('../../../assets/no-product-image.png')}
                  style={{width: 300, height: 300}}
                />
              ) : (
                <FlatList
                  data={values.images}
                  horizontal
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <FadeInImage
                      uri={item}
                      style={{width: 300, height: 300, marginHorizontal: 7}}
                    />
                  )}
                />
              )}
            </Layout>

            {/* Formulario */}
            <Layout style={{marginHorizontal: 10}}>
              <Input
                label="Titulo"
                style={{marginVertical: 5}}
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                style={{marginVertical: 5}}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Descripción"
                value={values.description}
                onChangeText={handleChange('description')}
                multiline
                numberOfLines={5}
                style={{marginVertical: 5}}
              />
            </Layout>
            {/* Precio e Inventario */}
            <Layout
              style={{marginHorizontal: 15, flexDirection: 'row', gap: 10}}>
              <Input
                label={'Precio'}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
              <Input
                label={'Inventario'}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
            </Layout>
            {/* Selectores */}
            {/* Talles */}
            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {sizes.map(size => (
                <Button
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            {/* Géneros */}
            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {genders.map(gender => (
                <Button
                  key={gender}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-300']
                      : undefined,
                  }}
                  onPress={() => setFieldValue('gender', gender)}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            {/* Boton guardar */}
            <Button
              accessoryLeft={<MyIcon name="save-outline" white />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{margin: 15}}>
              Guardar
            </Button>
            <Layout style={{height: 200}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
