import Cookies from "js-cookie";
import api from ".";

export const updateDetails = async (
  uri: string,
  payload: any,
  navigate: Function
): Promise<unknown> => {
  try {
    const authToken = Cookies.get("authToken");
    const { data } = await api.put(`/${uri}`, payload, {
      headers: { Authorization: authToken },
    });
    return data;
  } catch (err: any) {
    if (err.response.status === 401) {
      Cookies.remove("authToken");
      navigate("/login");
    }
  }
};
