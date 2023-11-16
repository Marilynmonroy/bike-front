import { Order } from "@/interface";
import Input from "../../Input";
import { FormEvent, useState } from "react";
import Titulo from "../../Tittle";
import Button from "../../Button";
import bikeAPI from "@/axios/instance";
import toast from "react-hot-toast";

interface formProps {
  order?: Order;
  onClose?: () => void;
  isUpdate?: boolean;
  onNextStep?: () => void;
}

export default function FormCustomer(props: formProps) {
  const [name, setName] = useState(props.order?.customer?.name ?? "");
  const [email, setEmail] = useState(props.order?.customer?.email ?? "");
  const [phone, setPhone] = useState(props.order?.customer?.phone ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const customer = { name, email, phone };

    if (props.isUpdate) {
      bikeAPI
        .patch(`customers/${props.order?.customer?.id}`, customer)
        .then((res) => {
          toast.success("Cliente actualizado con éxito");
          props.onNextStep?.();
        })
        .catch((error) => {
          toast.error("Error al actualizar el cliente", error);
        });
    } else {
      bikeAPI
        .post("customers", customer)
        .then((res) => {
          console.log(res);
          toast.success("Cliente creado con éxito");
          props.onClose?.();
        })
        .catch((error) => {
          toast.error("Error al crear el cliente", error);
        });
    }
  };

  return (
    <>
      {/* Datos de cliente */}
      <form className="mb-3" onSubmit={handleSubmit}>
        <Titulo>Clientes</Titulo>
        <div className="flex-1">
          <Input
            onChange={setName}
            value={name}
            text={"Nome"}
            placeholder={"Nome"}
            type="text"
            className="m-4"
            id={"name"}
          />
        </div>
        <div className="flex">
          <Input
            onChange={setEmail}
            value={email}
            text={"Email"}
            placeholder={"Email"}
            type="text"
            className="m-4"
            id={"email"}
          />
          <Input
            onChange={setPhone}
            value={phone}
            text={"Telefone"}
            placeholder={"Telefone"}
            type="text"
            className="m-4"
            id={"phone"}
          />
        </div>
        <div className=" flex justify-end m-4">
          <Button
            onClick={() => props.onClose?.()}
            className="border border-slate-400 text-gray-900 px-4 py-2 rounded-md mr-2 hover:border-pink-400"
          >
            Sair
          </Button>

          <Button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
}
