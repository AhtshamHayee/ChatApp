import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {auth} from '../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openSignUp = () => {
    navigation.navigate('Register');
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.navigate('Chat');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        secureTextEntry
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={{paddingVertical: 10}}>
        <Button title="sign in" style={styles.button} onPress={signin} />
      </View>

      <Button title="Signup" style={styles.button} onPress={openSignUp} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
  },
});

export default Login;
