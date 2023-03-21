import { endpoint } from "@/config";

export async function getCalories({ userUuid, searchDate }) {
  const params = {
    ...(userUuid && { userUuid }),
    ...(searchDate && { searchDate }),
  };
  return this.getMethod("get", {
    url: `${endpoint.calendar}/calories`,
    params,
  });
}

export async function postDiet({
  userUuid,
  productName,
  carbohydrate,
  protein,
  fat,
  eachCalories,
  servingWT,
  date,
}) {
  const data = {
    ...(userUuid && { userUuid }),
    ...(productName && { productName }),
    ...(carbohydrate && { carbohydrate }),
    ...(protein && { protein }),
    ...(fat && { fat }),
    ...(eachCalories && { eachCalories }),
    ...(servingWT && { servingWT }),
    date,
  };
  return this.getMethod("post", {
    url: `${endpoint.calendar}/diet`,
    data,
  });
}

export async function getDiet({ userUuid, date }) {
  const params = {
    ...(userUuid && { userUuid }),
    ...(date && { date }),
  };
  return this.getMethod("get", {
    url: `${endpoint.calendar}/diet`,
    params,
  });
}

export async function putDiet({ dietUuid, count, productName }) {
  const data = {
    ...(dietUuid && { dietUuid }),
    ...(count && { count }),
    ...(productName && { productName }),
  };
  return this.getMethod("put", {
    url: `${endpoint.calendar}/diet`,
    data,
  });
}

export async function deleteDiet({ dietUuid, userUuid }) {
  const data = {
    ...(userUuid && { userUuid }),
    ...(dietUuid && { dietUuid }),
  };

  return this.getMethod("delete", {
    url: `${endpoint.calendar}/diet/${userUuid}/${dietUuid}`,
  });
}
