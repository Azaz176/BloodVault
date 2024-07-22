import { axiosInstance } from ".";
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance(
      "post",
      "/api/users/register",
      payload
    );
    return response;
  } catch (error) {
    console.error("RegisterUser error:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance("post", "/api/users/login", payload);
    return response;
  } catch (error) {
    console.error("LoginUser error:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
export const GetCurrentUser = async () => {
  const response = await axiosInstance("get", "/api/users/get-current-user");
  return response;
};
export const GetAllDonorsOfanOrganization = () => {
  return axiosInstance("get", "/api/users/get-all-donors");
};
export const GetAllHospitalsOfanOrganization=()=>{
  return axiosInstance("get", '/api/users/get-all-hospitals')
}