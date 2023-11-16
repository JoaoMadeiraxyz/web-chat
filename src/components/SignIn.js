import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/app/page";

export default function SignIn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
  };