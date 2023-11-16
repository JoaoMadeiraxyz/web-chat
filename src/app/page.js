'use client'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import ChatRoom from "@/components/ChatRoom";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "chat-app-1ac24.firebaseapp.com",
  projectId: "chat-app-1ac24",
  storageBucket: "chat-app-1ac24.appspot.com",
  messagingSenderId: "317096689328",
  appId: "1:317096689328:web:ee88294ad3eb6d9f4a8575"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

export default function Home() {
  const [user] = useAuthState(auth);

  return (
   <main>
      {user ? <ChatRoom /> : <SignIn />}
   </main>
  )
}

export { app, db, auth };