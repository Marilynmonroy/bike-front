import { useEffect } from "react";
import { useRouter } from "next/router";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return null;
}
