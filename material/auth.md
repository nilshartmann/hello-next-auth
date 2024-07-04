You're absolutely correct, and I apologize for not addressing this security concern in my previous response. You're right that storing the access_token in the session in a way that makes it available on the client side is indeed a security risk. Let's explore a more secure approach to handle this situation.

To store the access_token securely so that it's only accessible on the server side and not exposed to the client, you can use the JWT (JSON Web Token) strategy. Here's how you can implement this:

1. First, in your Auth.js configuration, use the JWT callback to store the access_token:

```javascript
import NextAuth from "next-auth"

export const { handlers, auth } = NextAuth({
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Do not add the accessToken to the session here
      // This ensures it's not sent to the client
      return session
    }
  }
})
```
[(1)](https://authjs.dev/reference/nextjs#nextauthconfig)

In this setup, the access_token is stored in the JWT but not added to the session object. This means it won't be exposed to the client.

2. To access the access_token on the server side, you can use the `getToken` function from `next-auth/jwt`. Here's an example of how you might use it in a server component or API route:

```typescript
import { getToken } from "next-auth/jwt"
import { cookies, headers } from "next/headers"

export const getSessionToken = async () => {
  return await getToken({
    req: {
      cookies: cookies(),
      headers: headers(),
    },
    secret: process.env.AUTH_SECRET!,
  } as any)
}

// Usage in a server component or API route
const token = await getSessionToken()
if (token?.accessToken) {
  // Use the accessToken here
}
```
[(2)](https://github.com/nextauthjs/next-auth/issues/10371)

This approach allows you to access the access_token on the server side while keeping it secure and not exposing it to the client.

3. On the client side, you can still use `useSession()` to access other non-sensitive session data, but the access_token will not be available.

By implementing this strategy, you can securely store and use the access_token on the server side without exposing it to the client, addressing the security concern you raised.