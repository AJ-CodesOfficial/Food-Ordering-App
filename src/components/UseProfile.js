import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useProfile() {
  const session = useSession();
  const { status } = session;

  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);

      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setData(data);
          setLoading(false);
        });
      });
    } else if (status === "unauthenticated") {
      setData(false);
      setLoading(false);
    } else if (status === "loading") {
      setLoading(true);
    }
  }, [status]);

  return { loading, data };
}
