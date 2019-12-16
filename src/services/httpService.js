import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  console.log("for unauthenticated command: " + expectedError.status);
  console.log("error value: " + error);
  console.log("error status: " + error.response.status);
  if (
    error.response.status === 400 &&
    !axios.defaults.headers.common["x-auth-token"]
  ) {
    toast.error("User must be logged in to access this capability.");
  }

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
