import { Octicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function signUp() {
  const router = useRouter();
  const {register} = useAuth();

  const [loading, setLoading] = useState(false);

  // Using useRef instead of state variable bc we don't want the page to refresh when they change
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert('Sign In', "Please fill in all the fields!");
      return;
    }

    setLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    setLoading(false);

    console.log('Register result:', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ flex: 1, marginTop: 80 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: hp(4), fontWeight: 'bold' }}>Sign Up</Text>
        </View>

        {/* Username */}
        <View style={{ borderWidth: 1, borderColor: 'blue', flexDirection: 'row', alignItems: 'center', borderRadius: 8, marginTop: 16, marginHorizontal: 16, padding: 12 }}>
          <Feather style={{ marginLeft: 4 }} name="user" size='20' color='gray' />
          <TextInput 
            onChangeText={value => usernameRef.current = value}
            style={{ flex: 1, fontSize: 16, marginLeft: 12 }}
            placeholder='Username'
            placeholderTextColor={'gray'}
          />
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

        <View style={{ borderWidth: 1, borderColor: 'blue', flexDirection: 'row', alignItems: 'center', borderRadius: 8, margin: 16, padding: 12 }}>
          <Feather style={{ marginLeft: 4 }} name="image" size='20' color='gray' />
          <TextInput 
            onChangeText={value => profileRef.current = value}
            style={{ flex: 1, fontSize: 16, marginLeft: 12 }}
            placeholder='Profile URL'
            placeholderTextColor={'gray'}
          />
        </View>

        {/* SignUp */}
        <View>
          {
            loading ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Loading size={112}/>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={handleRegister}
                style={{ alignItems: 'center', backgroundColor: 'lightblue', marginHorizontal: 16, marginVertical: 24, padding: 16, borderRadius: 6 }}>
                <Text 
                  style={{ fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
              </TouchableOpacity>
            )
          }
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 16, marginTop: 8 }}>
          <Text style={{ }}>Already have an account. </Text>
          <Pressable onPress={() => router.push('signIn')}>
            <Text style={{ fontWeight: 'bold'}}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

const styles = StyleSheet.create({});