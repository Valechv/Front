import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const useRefreshToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginAction, logoutAction } = useAuth();

  const [mainLoading, setMainLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedToken = window.localStorage.getItem("accessToken")!;
        if (storedToken) {
          loginAction(null);
          navigate(location.pathname, { replace: true });
        }

        return;

        if (!storedToken) return setMainLoading(false);

        !mainLoading && setMainLoading(true);

        const response = await fetch(
          "https://biqueroo-production.up.railway.app/publication",
          {
            headers: { Authorization: "Bearer " + storedToken },
          }
        );

        const data = await response.json();

        if (!data?.length) throw new Error("Unauthorized");

        if (data.data) {
          // localStorage.setItem("", data.data.token);

          loginAction(null);
          navigate(location.pathname, { replace: true });
        }
      } catch (error) {
        localStorage.removeItem("accessToken");

        logoutAction();
      } finally {
        setMainLoading(false);
      }
    })();
  }, []);

  return { loading: mainLoading };
};

export default useRefreshToken;
