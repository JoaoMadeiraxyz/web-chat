import { useState, useEffect } from "react";

import { collection, query, limit, orderBy, addDoc, serverTimestamp } from "firebase/firestore";

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from "@/app/page";

import ChatMessage from "./ChatMessage";

export default function ChatRoom() {
    const [messages, setMessages] = useState([]);
  
    const messagesCollection = collection(db, 'messages');
    const messagesQuery = query(messagesCollection, orderBy('createdAt', 'desc'), limit(25));
    const [result] = useCollectionData(messagesQuery, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
    const messagesRef = collection(db, 'messages');
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      });
  
      setFormValue('');
    };
  
    useEffect(() => {
      if (result) {
        setMessages(result);
      }
    }, [result]);
  
    return (
      <>
        <div>
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
  
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      </>
    );
  }
  