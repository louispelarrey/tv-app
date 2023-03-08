import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url: string) => {
  const [data, setData] = useState<any | any[] | undefined>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(url, {
      signal,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.status === 401) {
          setError("Unauthorized");
          setLoading(false);
          navigate("/logout")
        }
        if (error.status !== 401) {
          setError(error);
          setLoading(false);
        }
      });

    return () => abortController.abort();
  }, [navigate, url]);

  return { data, error, loading };
}

export default useFetch;
