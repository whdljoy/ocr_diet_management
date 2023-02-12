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

export async function postUsers({
  email,
  password,
  name,
  nickname,
  weight,
  height,
  age,
  sex,
}) {
  const data = {
    ...(email && { email }),
    ...(password && { password }),
    ...(name && { name }),
    ...(nickname && { nickname }),
    ...(weight && { weight }),
    ...(height && { height }),
    ...(age && { age }),
    ...(sex && { sex }),
  };
  return this.getMethod("post", {
    url: `${endpoint.users}`,
    data,
  });
}
