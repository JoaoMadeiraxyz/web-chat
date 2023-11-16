import { auth } from "@/app/page";

export default function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
      <div className={`${messageClass === 'sent' ? 'self-end flex-row-reverse' : 'self-start'} p-4 flex items-center gap-1`}>
        <img className="w-9 h-9 rounded-full" src={photoURL} alt="user profile pic" />
        <p className={`${messageClass === 'sent' ? 'bg-blue-400 text-white' : 'bg-white text-gray-600'} p-4 rounded-full h-9 flex items-center`}>{text}</p>
      </div>
    )
  }