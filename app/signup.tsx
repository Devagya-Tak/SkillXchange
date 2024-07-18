import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/supabase';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSignup = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (!error) {
                // console.log(data)
                setIsEmailSent(true);
            } else {
                Alert.alert('Signup Error', error.message);
            }
        } catch (err) {
            Alert.alert('Signup Error... Please wait or try again');
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isEmailSent) {
                const { data, error } = await supabase.auth.getUser();
                if (data.user && data.user.email_confirmed_at) {
                    setIsLoggedIn(true);
                    clearInterval(interval);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isEmailSent]);

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <Text>You are now logged in.</Text>
                <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
                    <LinearGradient
                        colors={['#ff6a00', '#ee0979']}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }

    if (isEmailSent) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Check your email</Text>
                <Text style={styles.infoText}>We have sent you a verification link. Please check your email to verify your account.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account :)</Text>
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
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <LinearGradient
                    colors={['#ff6a00', '#ee0979']}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>
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
    infoText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20,
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
    signupButton: {
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
