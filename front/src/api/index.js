import axios from "axios";
import apis from "./modules";
import qs from "qs";
class ApiClient extends axios.Axios {
  /**
  @constructor
  @param {object} config
  @param {object} options
   */
  constructor(config = {}, options, categories) {
    const axiosConfig = ApiClient.transformToAxiosConfig(config, options);
    super(axiosConfig);

    this.authConfig = config;
    this.axiosConfig = axiosConfig;
    this.tokenRefreshing = false;
    this.tokenUpdateTime = null;
    this.tryRefreshTokenCount = 0;
    if (categories) {
      this.categories = Object.keys(apis)
        .filter((key) => {
          const findItem = categories.findIndex((category) => category === key);
          return findItem > -1 && apis[key];
        })
        .map((key) => key);
    } else {
      this.categories = Object.keys(apis).map((key) => key);
    }
    this.attachAPIs(this.categories);
    // this.updateAuthConfig = this.updateAuthConfig.bind(this);
    // this.updateResponseInterceptors =
    //   this.updateResponseInterceptors.bind(this);
    // this.updateRequestInterceptors = this.updateRequestInterceptors.bind(this);

    // this.updateRequestInterceptors();
    // this.updateResponseInterceptors();
    this.setParamsSerializer.call(this);
  }
  setParamsSerializer() {
    this.defaults.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    };
  }
  attachAPIs(categories) {
    categories.forEach((category) => {
      this[category] = {};
      Object.keys(apis[category]).forEach((methodName) => {
        this[category][methodName] = apis[category][methodName].bind(this);
      });
    });
  }

  static transformToAxiosConfig(config, options) {
    let authConfig = config;
    let axiosOptions = options;
    if (!authConfig || typeof authConfig !== "object") {
      authConfig = {};
    }

    if (!axiosOptions || typeof axiosOptions !== "object") {
      axiosOptions = {};
      if (!axiosOptions.baseURL) {
        throw new Error("please pass baseUrl");
      }
    }

    const baseURL = axiosOptions.baseURL;
    const axiosConfig = Object.assign(
      {
        baseURL,
        headers: {
          "Content-Type": "application/json",
        },
      },
      axiosOptions
    );
    if (authConfig.token) {
      axiosConfig.headers.Authorization = `Bearer ${authConfig.token}`;
    }

    return axiosConfig;
  }
  getMethod(method, { url, params = {}, data = {}, headers }) {
    if (method === "get") {
      return this.get(url, {
        params,
      });
    } else if (method === "post") {
      return this.post(url, data, {
        headers: headers,
      });
    } else if (method === "put") {
      return this.put(url, data, {
        headers: headers,
      });
    } else if (method === "delete") {
      return this.delete(
        url,
        { data },
        {
          headers: headers,
        }
      );
    }
  }
}

export default ApiClient;
