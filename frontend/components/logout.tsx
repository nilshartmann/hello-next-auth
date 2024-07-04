import {signIn, signOut} from "@/auth"

export default function Logout() {
	return (
		<form
			action={async () => {
				"use server"
				await signOut()
			}}
		>
			<button type="submit">Logout</button>
		</form>
	)
}