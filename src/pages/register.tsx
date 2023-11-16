import "../styles/globals.css";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import { User } from "@/interface";
import bikeAPI from "@/axios/instance";
import toast, { Toaster } from "react-hot-toast";

interface loginProps {
  user: User;
}

export default function Register(props: loginProps) {
  const [username, setUsername] = useState(props.user?.username ?? "");
  const [password, setPassword] = useState(props.user?.password ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = { username, password };

    bikeAPI
      .post("register", user)
      .then((res) => {
        console.log(res);
        toast("usuário criado");
      })
      .catch((error) => {
        console.error("Erro na solicitação:", error);
      });
  };

  return (
    <div
      className={`flex flex-col h-screen
      bg-gray-900 text-white
    `}
    >
      <div className="flex justify-center items-center h-screen">
        <Layout titulo={"Registrar"}>
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
                Criar
              </Button>
            </div>
          </form>
        </Layout>
      </div>
    </div>
  );
}
