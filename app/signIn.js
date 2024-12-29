import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

const signIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Using useRef instead of state variable bc we don't want the page to refresh when they change
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Please fill in all the fields!");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert('Sign in', response.msg);
    }
  };

  return (
    <CustomKeyboardView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, marginTop: 80 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: hp(4), fontWeight: 'bold' }}>Sign In</Text>
        </View>

        {/* Email/Password */}
        <View style={{ borderWidth: 1, borderColor: 'blue', flexDirection: 'row', alignItems: 'center', borderRadius: 8, margin: 16, padding: 12 }}>
          <Octicons style={{ marginLeft: 4 }} name="mail" size='20' color='gray' />
          <TextInput 
            onChangeText={value => emailRef.current = value}
            style={{ flex: 1, fontSize: 16, marginLeft: 12 }}
            placeholder='Email'
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={{ borderWidth: 1, borderColor: 'blue', flexDirection: 'row', alignItems: 'center', borderRadius: 8, marginHorizontal: 16, padding: 12 }}>
          <Octicons style={{ paddingHorizontal: 2, marginLeft: 4 }} name="lock" size='20' color='gray' />
          <TextInput 
            onChangeText={value => passwordRef.current = value}
            style={{ flex: 1, fontSize: 16, marginLeft: 12 }}
            placeholder='Password'
            secureTextEntry
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={{ alignItems: 'flex-end', marginRight: 16, marginTop: 8 }}>
          <Pressable onPress={() => console.log('Forgot password clicked')}>
            <Text style={{ }}>Forgot password?</Text>
          </Pressable>
        </View>

        {/* SignIn/SignUp */}
        <View>
          {
            loading ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Loading size={112}/>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={handleLogin}
                style={{ alignItems: 'center', backgroundColor: 'lightblue', marginHorizontal: 16, marginVertical: 24, padding: 16, borderRadius: 6 }}>
                <Text 
                  style={{ fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
              </TouchableOpacity>
            )
          }
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 16, marginTop: 8 }}>
          <Text style={{ }}>Don't have an account? </Text>
          <Pressable onPress={() => router.push('signUp')}>
            <Text style={{ fontWeight: 'bold'}}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

export default signIn;

const styles = StyleSheet.create({});