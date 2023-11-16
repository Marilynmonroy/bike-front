import "../styles/globals.css";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import { User } from "@/interface";
import bikeAPI from "@/axios/instance";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import router, { useRouter } from "next/router";

interface loginProps {
  user: User;
}

export default function Login(props: loginProps) {
  const router = useRouter();
  const [username, setUsername] = useState(props.user?.username ?? "");
  const [password, setPassword] = useState(props.user?.password ?? "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = { username, password };

    try {
      const response = await bikeAPI.post("auth/login", user);
      toast("Bem-vindo ao sistema");
      const token = response.data.accessToken;
      document.cookie = `access_token=${token}; path=/`;
      router.push("/home");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen
      bg-gray-900 text-white
    `}
    >
      <div className="flex justify-center items-center h-screen">
        <Layout titulo={"Login"}>
          <form onSubmit={handleSubmit}>
            <div className="m-2">
              <Input
                value={username}
                id={"username"}
                text={"Username"}
                placeholder={"username"}
                onChange={setUsername}
                className="mb-4"
              />
              <Input
                value={password}
                id={"username"}
                text={"Senha"}
                placeholder={"senha"}
                onChange={setPassword}
              />
            </div>
            <div className=" flex justify-center items-center">
              <Button
                type="submit"
                className={`m-2 bg-pink-600 text-white px-4 py-2 rounded-md`}
              >
                Entrar
              </Button>
            </div>
          </form>
          <div className="text-center">
            <span className="text-sm w-2/3 text-center text-gray-500">
              Registre um novo{" "}
              <Link className="text-green-700 font-semibold" href="/register">
                usuário
              </Link>
            </span>
          </div>
        </Layout>
      </div>
    </div>
  );
}
