import { endpoint } from "@/config";

export async function getUserInfo({ email }) {
  const params = {
    email,
  };
  return this.getMethod("get", {
    url: `${endpoint.users}`,
    params,
  });
}

export async function postUsers({ userId, password, nickname = "" }) {
  const data = {
    userId,
    password,
    nickname,
  };
  return this.getMethod("post", {
    url: `${endpoint.users}`,
    data,
  });
}
