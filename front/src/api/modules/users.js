import { endpoint } from "@/config";

export async function getUser({ email, password }) {
  const params = {
    ...(email && { email }),
    ...(password && { password }),
  };
  return this.getMethod("get", {
    url: `${endpoint.users}/login`,
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
  exercise,
  purpose,
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
    ...(exercise && { exercise }),
    ...(purpose && { purpose }),
  };
  return this.getMethod("post", {
    url: `${endpoint.users}`,
    data,
  });
}
