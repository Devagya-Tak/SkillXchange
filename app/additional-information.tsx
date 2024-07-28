import { View, Text, Alert, Button, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/supabase';
import { User, UserResponse } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';

const AdditionalInformation = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      selectionLimit: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (image) {
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: 'base64',
      });
      const filePath = `${user!.id}/${new Date().getTime()}.png`;
      try {
        const { data, error } = await supabase.storage.from('pfps').upload(filePath, decode(base64), {
          contentType: 'image/png',
        });
        if (!error) {
          Alert.alert('Upload Successful');
        } else {
          Alert.alert('Upload Failed', error.message);
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Upload Failed', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick image" onPress={pickImage} />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Button onPress={uploadImage} title="Upload image" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default AdditionalInformation;
