import { getToken } from "next-auth/jwt"
import { cookies, headers } from "next/headers"

export async function getSessionToken  () {
	return await getToken({
		req: {
			cookies: cookies(),
			headers: headers(),
		},
		secret: process.env.AUTH_SECRET!,
	} as any)
}