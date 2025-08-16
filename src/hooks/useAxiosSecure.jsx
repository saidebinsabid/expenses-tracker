import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(config => config);
    const resInterceptor = axiosSecure.interceptors.response.use(
      res => res,
      err => {
        const status = err?.response?.status;
        if (status === 401) navigate("/auth/login");
        if (status === 403) navigate("/forbidden");
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
