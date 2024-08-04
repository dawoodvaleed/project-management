import Cookies from "js-cookie";
import api from ".";

export const deleteData = async (
  uri: string,
  id: any,
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
    const { data } = await api.delete(`/${uri}/${id}`, {
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
