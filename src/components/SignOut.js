import { auth } from "@/app/page"

export default function SignOut() {
    return auth.currentUser && (
      <button className="text-white" onClick={() => auth.signOut()}>Sign Out</button>
    )
}