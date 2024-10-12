import type { App } from "vue";
import type { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import { useAuthStore } from "@/stores/auth";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  private static isRefreshing = false;
  private static refreshSubscribers: Array<() => void> = [];

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
    ApiService.vueInstance.axios.defaults.withCredentials = true;

    // Add a response interceptor
    ApiService.vueInstance.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const authStore = useAuthStore();
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Check if the error is 401 and it's not a login or refresh token request
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("auth/login") &&
          !originalRequest.url?.includes("auth/token/refresh")
        ) {
          if (!authStore.isAuthenticated) {
            // Prevent further token refresh if user is not authenticated
            return Promise.reject(error);
          }
          if (ApiService.isRefreshing) {
            return new Promise((resolve) => {
              ApiService.refreshSubscribers.push(() => {
                resolve(axios(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          ApiService.isRefreshing = true;

          try {
            await authStore.refreshToken();
            ApiService.onRefreshed();
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, redirect to login
            window.location.href = "/sign-in";
            return Promise.reject(refreshError);
          } finally {
            ApiService.isRefreshing = false;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private static onRefreshed() {
    ApiService.refreshSubscribers.forEach((callback) => callback());
    ApiService.refreshSubscribers = [];
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  /**
   * @description set the Multipart/form-data HTTP request headers
   */

  public static setMultipartHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "multipart/form-data";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the PATCH HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
