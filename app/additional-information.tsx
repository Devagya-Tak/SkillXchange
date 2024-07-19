import { View, Text, Button, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/supabase'
import * as ImagePicker from 'expo-image-picker'
import { Stack } from 'expo-router'

const AdditionalInformation = () => {
  interface Skill {
    name?: string
  }
  const [username, setUsername] = useState('')
  const [pfpUrl, setPfpUrl] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .insert({
        username,
        pfp_url: pfpUrl,
        skills
      })
  }
  return (
    // <View>
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'hello',
        
      }} />
      <Text>Hello world</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
    // </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  image: {
    width: 200,
    height: 200,
  },
});


export default AdditionalInformation