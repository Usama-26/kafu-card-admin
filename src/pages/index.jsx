import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authApi";
import {
  getAuthError,
  getAuthLoading,
  getUser,
} from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const loading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.replace("/app");
    }
  }, [user, router]);

  return (
    <AuthLayout>
      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <LoginForm loading={loading} error={error} onLogin={handleLogin} />
    </AuthLayout>
  );
}
