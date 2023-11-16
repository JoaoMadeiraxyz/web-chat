import { auth } from "@/app/page";

export default function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
      <div className={messageClass === 'sent' ? 'text-blue-400' : 'text-green-500'}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    )
  }