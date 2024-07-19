import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/supabase'
import { Link, useRouter } from 'expo-router';

export default function LoginForm() {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (!error) {
                console.log('All is well')
                setIsLoggedIn(true)
                router.replace('/additional-information')

            } else {
                console.log('Error : ', error)
            }
        } catch (err) {
            console.log(err)
        }

    };

    // if (isLoggedIn) {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.title}>Welcome!</Text>
    //             <Text>You are now logged in.</Text>
    //             <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
    //                 <LinearGradient
    //                     colors={['#ff6a00', '#ee0979']}
    //                     start={[0, 0]}
    //                     end={[1, 1]}
    //                     style={styles.gradient}
    //                 >
    //                     <Text style={styles.buttonText}>Logout</Text>
    //                 </LinearGradient>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to continue {':)'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <LinearGradient
                    colors={['#ff6a00', '#ee0979']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text
                style={{
                    color: 'white',
                    fontSize: 19,
                    fontWeight: 'condensedBold',
                    textAlign: 'left'

                }} >
                Don't Have an account?
                <Link
                    href={'/signup'}
                    style={{
                        textDecorationLine: 'underline'
                    }} > Signup
                </Link>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#000',
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: 'white',
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
