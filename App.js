import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '895917269021-t83f0p0hph9uvqp0tpoesi59q8hir6u8.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleLogin = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in
      .then(user => {
        const info_full = user.additionalUserInfo.profile;

        if (info_full) {
          setName(info_full.name);
          setEmail(info_full.email);
          setImage(info_full.picture);
        }

        // if (user) {
        //   navigation.navigate('Home', { userInfo: user.additionalUserInfo.profile })
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onGoogleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    setName();
    setEmail();
    setImage();
  };

  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {name && email && image ? (
        <>
          <Image
            source={{ uri: image || null }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{name}</Text>
          <Text>{email}</Text>

          <TouchableOpacity style={styles.buttonLogin} onPress={onGoogleLogout}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
              Logout with Google
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.buttonLogin} onPress={onGoogleLogin}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
            Login with Google
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: 'orange',
    width: 180,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
