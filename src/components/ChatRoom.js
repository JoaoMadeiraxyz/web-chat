import { useState, useEffect } from "react";

import { collection, query, limit, orderBy, addDoc, serverTimestamp } from "firebase/firestore";

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from "@/app/page";

import ChatMessage from "./ChatMessage";

import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

export default function ChatRoom() {
    const [messages, setMessages] = useState([]);
  
    const messagesCollection = collection(db, 'messages');
    const messagesQuery = query(messagesCollection, orderBy('createdAt', 'asc'), limit(25));
    const [result] = useCollectionData(messagesQuery, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
    const messagesRef = collection(db, 'messages');
  
    const sendMessage = async (e) => {
      e.preventDefault();

      if (formValue == '') {
        return;
      }
  
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
      <section className="px-72 w-full h-screen">
        <div className="flex flex-col justify-end w-full h-full bg-[#07011a]">
          <div className="flex flex-col w-full h-fit pt-10 overflow-y-scroll">
            <div className="flex flex-col">
              {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
      
            <form className="text-white h-16 w-full bg-[#2c2b2b] flex justify-between" onSubmit={sendMessage}>
              <input className="p-4 h-full w-[90%] bg-transparent" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
              <button className="p-4 w-[10%] flex items-center justify-center bg-[#4d21d1]" type="submit"><PaperPlaneTilt size={24} color="#ffffff" /></button>
            </form>
          </div>
        </div>
      </section>
    );
  }
  