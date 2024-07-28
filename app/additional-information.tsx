import { View, Text, Alert, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { supabase } from '@/supabase'
import { User, UserResponse } from '@supabase/supabase-js'
import { decode } from 'base64-arraybuffer'


const AdditionalInformation = () => {

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [user, setUser] = useState<User | null>(null)

  const getUser = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    setUser(user)
  }

  useEffect(() => {

    getUser();
  }, [])



  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.canceled) {
      setImage(result.assets[0])
    }

  }

  const uploadImage = async () => {
    if (image) {
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: 'base64'
      })
      const filePath = `${user!.id}/${new Date().getTime()}.${image.type === 'image' ? 'png' : 'mp4'}`
      const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';
      try {
        const { data, error } = await supabase
          .storage
          .from('pfps')
          .upload(filePath, decode(base64), {
            contentType: contentType
          })
        if (!error) {
          Alert.alert("All is well")
        } else {
          Alert.alert("All is not well", error.message)
        }
      } catch (err) {
        console.error(err);

      }

    }
  }
  return (
    <View>
      <Button title='Pick image' onPress={pickImage} />
      {
        image &&
        <View>
          <Image source={{uri: image.uri}} />
          <Button onPress={uploadImage} title='Upload image' />
        </View>
      }
    </View>
  )
}

export default AdditionalInformation