import React, {useState, useLayoutEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {auth, db} from '../firebaseConfig';
import {signOut} from 'firebase/auth';
import {Avatar} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  addDoc,
  query,
  orderBy,
  onSnapshot,
  collection,
} from 'firebase/firestore';

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  const ProfilePic = () => (
    <View style={{marginLeft: 20}}>
      <Avatar
        rounded
        source={{
          uri: auth?.currentUser?.photoURL,
        }}
      />
    </View>
  );

  const Logout = () => (
    <TouchableOpacity
      style={{
        marginRight: 10,
      }}
      onPress={signOutNow}>
      <Text>logout</Text>
    </TouchableOpacity>
  );
  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ProfilePic />,
      headerRight: () => <Logout />,
    });

    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot =>
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      ),
    );

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSendMessage = useCallback((messages = []) => {
    const {_id, createdAt, text, user} = messages[0];

    addDoc(collection(db, 'chats'), {_id, createdAt, text, user});
  }, []);

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL,
        }}
        onSend={messages => onSendMessage(messages)}
      />
    </View>
  );
};

export default Chat;
