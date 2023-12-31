import { initialAbility } from "@/libs/acl/config";
import { Ability } from "@casl/ability";
import { smartContentApi } from "@/views/smart-content/service/axios.js";
import Vue from "vue";
// import { swalErrorIcon } from "@/icons/statusIcons";
const ability = new Ability();
export function initialize(router) {
  smartContentApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // for Laravel or Spring boot application
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
//   smartContentApi.interceptors.response.use(null, (error) => {
//     if (error.response.status == 401) {
//       // Remove userData from localStorage
//       // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
//       localStorage.removeItem("accessToken");
//       // Remove userData from localStorage
//       localStorage.removeItem("userData");
//       ability.update(initialAbility);
//       router.push({ name: "auth-login" });
//       Vue.swal.fire({
//         title: "Session Expired",
//         imageUrl: swalErrorIcon,
//         text: "Your session has expired. Please login again.",
//         confirmButtonText: "OK",
//         showConfirmButton: true,
//       });
//     }
//     return Promise.reject(error);
//   });
}
