"use server";
import { auth } from "@/auth";
import { getSessionToken } from "@/app/get-session-token";
import { currentDate } from "@/components/current-date";

async function getAuthHeader() {
  const token = await getSessionToken();
  console.log("getAuthHeader token", token);
  if (token?.helloAuthAccessToken) {
    const authHeader = `Bearer ${token.helloAuthAccessToken as string}`;
    console.log(
      "HelloAuthAcessToken is set -> calling external service with header",
      authHeader,
    );
    return authHeader;
  }
  return null;
}

export async function ping() {
  const session = await auth();
  const authHeader = await getAuthHeader();

  console.log("PING", currentDate(), session);

  if (authHeader) {
    const url =
      "http://localhost:21081/realms/hello-auth-realm/protocol/openid-connect/userinfo";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        // add the token you received to the userinfo request, sent to keycloak
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
    });

    console.log("Response from keycloak", response.status, response.statusText);
    if (response.ok) {
      const userinfo = await response.json();
      return `User-Info from Keycloak: ${JSON.stringify(userinfo)}`;
    } else {
      return `Status Code from Keycloak Request: ${response.status} ${response.statusText}`;
    }
  } else {
    return "No authToken in token found - no request to keycloak!";
  }
}

const backendUrl = (p: string) => `http://localhost:21082${p}`;

export async function getHello() {
  const url = backendUrl("/api/hello");
  console.log("Get Hello from", url);
  const authHeader = await getAuthHeader();
  const headers = new Headers();
  if (authHeader) {
    headers.append("Authorization", authHeader);
  }
  const response = await fetch(url, {
    headers,
  });
  if (response.ok) {
    const body = await response.text();
    return `Result from Spring Service: ${body}`;
  }

  return `Calling Spring Service failed: ${response.status} ${response.statusText}`;
}

export async function getMoney() {
  const url = backendUrl("/api/money");
  const authHeader = await getAuthHeader();
  console.log("Get Money from", url);
  const headers = new Headers();
  if (authHeader) {
    headers.append("Authorization", authHeader);
  }
  const response = await fetch(url, {
    headers,
  });

  if (response.ok) {
    const body = await response.text();
    return `Result from Spring Service: ${body}`;
  }

  return `Calling Spring Service failed: ${response.status} ${response.statusText}`;
}
