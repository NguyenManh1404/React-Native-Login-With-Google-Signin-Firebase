# Đăng nhập nhanh bằng google:

vip: https://youtu.be/gai4aYcNunc

https://rnfirebase.io/

https://github.com/react-native-google-signin/google-signin

1. Cài đặt: **npm i @react-native-firebase/app**

2. Cài đặt **npm i @react-native-firebase/auth**

3. Cài đặt: **npm i @react-native-google-signin/google-signin**

4. Lấy file **google-services.json** từ https://console.firebase.google.com/u/0/ về để bỏ vào **android\app\google-services.json**

- Để lấy SHA-1 key: chạy lệnh: **cd android && ./gradlew signingReport**
- Sau khi kết thúc thì hãy dowload file: **google-services.json** và bỏ vào đúng vị trí

5. Vào link này vào chọn Google method https://console.firebase.google.com/u/0/project/signupdemo2enouvo/authentication/providers

6. theo link này để cài đặt môi trường: https://rnfirebase.io/

- Đầu tiên: vào **/android/build.gradle** thêm 2 dòng:

```js

//dòng 1

buildscript {

    ext {
      ....
        googlePlayServicesAuthVersion = "19.2.0" // Đăng nhập nhanh với google
      ....
    }
}


//dòng 2
buildscript {
  dependencies {
   ....
    classpath 'com.google.gms:google-services:4.3.10'//Đăng nhập nhanh với google
   ....
  }
}
```

- Sau đó vào: **/android/app/build.gradle** thêm 2 dòng ở đầu file luôn

```js
//dòng 1
    apply plugin: 'com.android.application'
    apply plugin: 'com.google.gms.google-services' //Đăng nhập nhanh với google



//dòng 2

dependencies {
  ...
    implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0" //Đăng nhập nhanh với google
  ...
}
```

7. Vậy là phần setup đã hoàn thành:

8. Tiến hành sử dụng theo link: https://rnfirebase.io/auth/social-auth#google

9. Cài đặt thư viện **navigation** để chuyển trang khi đăng nhập thành công.

- npm i @react-navigation/native
- npm i @react-navigation/stack

9.  Tạo file **LoginScreen.js** và đảm bảo trong file phải có dòng này:

```js
import {GoogleSignin} from '@react-native-google-signin/google-signin';
//Bỏ trong useEffect() là tốt nhất
GoogleSignin.configure({
  webClientId: 'ma_nay_lay_trong_file_google-services.json_moi_tai_ve',
});
```

10. Demo file **App.js**

  <details>

```js
import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
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
    const {idToken} = await GoogleSignin.signIn();

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
      style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      {name && email && image ? (
        <>
          <Image
            source={{uri: image || null}}
            style={{width: 100, height: 100}}
          />
          <Text>{name}</Text>
          <Text>{email}</Text>

          <TouchableOpacity style={styles.buttonLogin} onPress={onGoogleLogout}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              Logout with Google
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.buttonLogin} onPress={onGoogleLogin}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
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
```

  </details>
