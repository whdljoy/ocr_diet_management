import { endpoint } from "@/config";

export async function getUserInfo({ userId, password }) {
  const params = {
    userId,
  };
  return this.getMethod("get", true, {
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
