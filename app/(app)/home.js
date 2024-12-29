import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useAuth } from '../../context/authContext';

export default function Home () {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <View>
      <Text>HOME</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({});