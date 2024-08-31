import Cookies from "js-cookie";
import api from ".";

export const fetchDetails = async (
  uri: string,
  navigate: Function
): Promise<unknown> => {
  try {
    const authToken = Cookies.get("authToken");
    const { data } = await api.get(`/${uri}`, {
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
