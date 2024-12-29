import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Platform
const ios = Platform.OS == 'ios';

export default function CustomKeyboardView ({children}) {
  return (
    <KeyboardAvoidingView
      behavior={ ios ? 'padding' : 'height' }
      style={{ flex: 1 }}
    >
      <SafeAreaView />
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        { children }
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({})