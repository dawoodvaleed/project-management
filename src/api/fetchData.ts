import Cookies from "js-cookie";
import api from ".";

export const fetchData = async (
  uri: string,
  queryStr: string,
  navigate: Function
): Promise<
  | {
      rows: never[];
      total: number;
    }
  | undefined
> => {
  try {
    const authToken = Cookies.get("authToken");
    const { data } = await api.get(`/${uri}${queryStr}`, {
      headers: { Authorization: authToken },
    });
    const [rows, total] = data;
    return { rows, total };
  } catch (err: any) {
    if (err.response?.status === 401) {
      Cookies.remove("authToken");
      navigate("/login");
    }
  }
};
