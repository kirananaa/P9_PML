import {
  addDoc, collection, onSnapshot,
  orderBy, query, serverTimestamp
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList, KeyboardAvoidingView, Platform,
  StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';

export default function ChatScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null); // ← untuk fitur reply
  const flatListRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const msgData = {
      text: text.trim(),
      senderId: user.uid,
      senderName: user.displayName || user.email,
      timestamp: serverTimestamp(),
    };

    if (replyTo) {
      msgData.replyTo = {
        id: replyTo.id,
        text: replyTo.text,
        senderName: replyTo.senderName,
      };
    }

    await addDoc(collection(db, 'messages'), msgData);
    setText('');
    setReplyTo(null);
  };

  const getInitial = (name) => (name || '?').charAt(0).toUpperCase();

  const renderItem = ({ item }) => {
    const isMe = item.senderId === user.uid;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => setReplyTo(item)} 
      >
        <View style={[styles.row, isMe && styles.rowMe]}>

          
          {!isMe && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitial(item.senderName)}</Text>
            </View>
          )}

          <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>

     
            {!isMe && (
              <Text style={styles.senderName}>{item.senderName}</Text>
            )}

            {item.replyTo && (
              <View style={[styles.replyPreview, isMe && styles.replyPreviewMe]}>
                <Text style={styles.replyName}>{item.replyTo.senderName}</Text>
                <Text style={styles.replyText} numberOfLines={1}>
                  {item.replyTo.text}
                </Text>
              </View>
            )}

            <Text style={[styles.msgText, isMe && styles.msgTextMe]}>
              {item.text}
            </Text>

            <Text style={[styles.timeText, isMe && styles.timeTextMe]}>
              {item.timestamp?.toDate
                ? item.timestamp.toDate().toLocaleTimeString('id-ID', {
                    hour: '2-digit', minute: '2-digit'
                  })
                : '...'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 12, paddingBottom: 8 }}
        />

        {replyTo && (
          <View style={styles.replyBar}>
            <View style={styles.replyBarInfo}>
              <Text style={styles.replyBarLabel}>↩ Membalas {replyTo.senderName}</Text>
              <Text style={styles.replyBarText} numberOfLines={1}>{replyTo.text}</Text>
            </View>
            <TouchableOpacity onPress={() => setReplyTo(null)}>
              <Text style={styles.replyBarClose}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Tulis pesan..."
            placeholderTextColor="#aaa"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!text.trim()}
          >
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },

  // Pesan
  row: { flexDirection: 'row', marginBottom: 8, alignItems: 'flex-end' },
  rowMe: { flexDirection: 'row-reverse' },

  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#4285F4', justifyContent: 'center',
    alignItems: 'center', marginRight: 8,
  },
  avatarText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },

  bubble: {
    maxWidth: '75%', padding: 10, borderRadius: 16,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 4, elevation: 1,
  },
  bubbleMe: {
    backgroundColor: '#4285F4',
    borderBottomRightRadius: 4,
    marginLeft: 40,
  },
  bubbleOther: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },

  senderName: { fontSize: 11, fontWeight: '700', color: '#4285F4', marginBottom: 2 },

  msgText: { fontSize: 15, color: '#1a1a2e', lineHeight: 20 },
  msgTextMe: { color: '#fff' },

  timeText: { fontSize: 10, color: '#aaa', marginTop: 4, alignSelf: 'flex-end' },
  timeTextMe: { color: 'rgba(255,255,255,0.7)' },

  replyPreview: {
    backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: 8,
    padding: 6, marginBottom: 6, borderLeftWidth: 3, borderLeftColor: '#aaa',
  },
  replyPreviewMe: { borderLeftColor: 'rgba(255,255,255,0.6)' },
  replyName: { fontSize: 11, fontWeight: '700', color: '#555', marginBottom: 1 },
  replyText: { fontSize: 12, color: '#777' },

  // Reply bar di atas input
  replyBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', paddingHorizontal: 16,
    paddingVertical: 10, borderTopWidth: 1, borderColor: '#eee',
  },
  replyBarInfo: { flex: 1 },
  replyBarLabel: { fontSize: 12, fontWeight: '700', color: '#4285F4' },
  replyBarText: { fontSize: 12, color: '#888', marginTop: 1 },
  replyBarClose: { fontSize: 16, color: '#aaa', paddingLeft: 12 },

  inputRow: {
    flexDirection: 'row', padding: 10, backgroundColor: '#fff',
    borderTopWidth: 1, borderColor: '#eee', alignItems: 'flex-end',
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#e0e0e0',
    borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10,
    fontSize: 15, maxHeight: 100, marginRight: 8, backgroundColor: '#f8f8f8',
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#4285F4', justifyContent: 'center', alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#c5d8ff' },
  sendText: { color: '#fff', fontSize: 16 },
});