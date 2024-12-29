import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();   // returns all segments in current route
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated or not
    //  - if undefined, keep showing the loading state to user
    if (typeof isAuthenticated == 'undefined') return;

    const inApp = segments[0] == '(app)'; // user already in app group

    console.log('isAuthenticated:', isAuthenticated);

    if (isAuthenticated && !inApp) {
      // redirect to Home
      router.replace('home'); // used replace to prevent user from going back to loading page
    } else if (isAuthenticated == false) {
      // redirect to SignIn
      router.replace('signIn');
    } else {
      router.replace('signUp');
    }


  }, [isAuthenticated]);

  return <Slot/>
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  )
}

const styles = StyleSheet.create({})