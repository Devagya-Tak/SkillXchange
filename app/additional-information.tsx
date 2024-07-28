import { View, Text, Alert, Button, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/supabase';
import { User, UserResponse } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import { Stack } from 'expo-router';

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
      <Stack.Screen
        options={{
          title: 'Additional Information',
          headerStyle: styles.header,
          headerTintColor: '#fff',
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
      <Button title="Pick Image" onPress={pickImage} color="#1e90ff" />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Button onPress={uploadImage} title="Upload Image" color="#32cd32" />
        </View>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    backgroundColor: '#1c1c1e',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
});


export default AdditionalInformation;
