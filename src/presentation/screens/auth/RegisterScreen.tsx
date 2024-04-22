import React from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen">{

}

export const RegisterScreen = ({navigation}:Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.30}}>
          <Text category="h1">Crear Cuenta</Text>
          <Text category="p2">Crea una cuenta para continuar</Text>
        </Layout>
        <Layout style={{height: 20}}/>
        <Layout>
        <Input
            placeholder="Nombre Completo"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name='person-outline'/>}
          />
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name='email-outline'/>}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name='lock-outline'/>}
          />
        </Layout>

        {/* Space */}

        <Layout style={{height: 20}}/>

        {/* Button */}
        <Layout>
          <Button onPress={() => {}} accessoryRight={<MyIcon name='arrow-forward-outline' white/>}>
            Registrarse
          </Button>
        </Layout>

        {/* info de crear cuenta */}

        <Layout style={{height: 50}}/>

        <Layout style={{alignItems: "flex-end", flexDirection: "row", justifyContent: "center", gap: 5}}>
          <Text>¿Ya tienes una cuenta?</Text>
          <Text status='primary' category='s1' onPress={() => navigation.goBack()}>Ingresar</Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
