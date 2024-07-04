import { signIn } from "@/auth"

export default function Login() {
	return (
		<form
			action={async () => {
				"use server"
				await signIn("keycloak")
			}}
		>
			<button type="submit">Signin with keycloak</button>
		</form>
	)
}