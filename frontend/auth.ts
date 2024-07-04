import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	basePath: "/auth",
	providers: [Keycloak],

	callbacks: {
		async jwt(params) {
			console.log("JWT CALLBACK", params.token, params.account);
			if (!params.account) {
				console.warn("NO ACCOUNT IN PARAMS - RETURNING TOKEN UNCHANGED", params.token);
				return params.token;
			}
			return { ...params.token, helloAuthAccessToken: params.account?.access_token }
		},
		session({session, token}) {
			// console.log("SESSION CALLBACK", session, token)
			// // @ts-ignore
			// session.accessToken = token.accessToken;
			// @ts-ignore
			session.HURZ = "HURZ"
			return session;
		}
	}
})