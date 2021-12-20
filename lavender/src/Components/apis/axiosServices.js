import axios from "axios";

class AxiosServices {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    axios.defaults.withCredentials = true
    this.instance = instance;
    
  }
  handleSuccess(response) {
    return response;
  }
  handleError(error) {
    return Promise.reject(error);
  }
  get(url, config) {
    return this.instance.get(url, config);
  }
  getImage(url) {
    return this.instance.get(url, { responseType: "blob" });
  }
  post(url, data, config) {
    return this.instance.post(url, data, config);
  }
  put(url, data, config) {
    return this.instance.put(url, data, config);
  }
  delete(url, config) {
    return this.instance.delete(url, config);
  }
}
export default new AxiosServices();
