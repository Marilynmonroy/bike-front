import { Customer, Order } from "@/interface";
import Input from "../../Input";
import { useEffect, useState } from "react";
import Titulo from "../../Tittle";
import Button from "../../Button";
import bikeAPI from "@/axios/instance";
import Select from "@/components/Select";
import CustomersData from "../customer/customersData";

interface formProps {
  order?: Order;
  customer?: Customer;
  onClose?: () => void;
}

export default function FormBicycle(props: formProps) {
  const [model, setModel] = useState(props.order?.bicycle?.model ?? "");
  const [color, setColor] = useState(props.order?.bicycle?.color ?? "");
  const [characteristics, setCharacteristics] = useState(
    props.order?.bicycle?.characteristics ?? ""
  );
  const [customerEmail, setCustomerEmail] = useState<Customer[] | null>(null);
  const [select, setSelect] = useState<Customer | null>();

  useEffect(() => {
    bikeAPI
      .get("customers")
      .then((res) => {
        setCustomerEmail(res.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bicycle = {
      model,
      color,
      characteristics,
      customerEmail: select?.email,
    };

    bikeAPI
      .post("bicycles", bicycle)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
    alert("cliente cadastrado");
  };

  return (
    <>
      {/* Datos de bike */}
      <form className="mb-3" onSubmit={handleSubmit}>
        <Titulo>Bikes</Titulo>
        <div className="m-4">
          <Select
            onChange={(e) => {
              const email = customerEmail?.find(
                (x) => x.email === e.target.value
              );
              setSelect(email);
            }}
            tittle={"Cliente"}
            placeholder="Seleccione un cliente"
          >
            <option>Selecione um cliente</option>
            {customerEmail
              ? customerEmail?.map((customer) => {
                  return (
                    <option
                      key={customer.id}
                      value={customer.email}
                      className="appearance-none"
                    >
                      {customer.email}
                    </option>
                  );
                })
              : null}
          </Select>
          <CustomersData customer={select} />
        </div>
        <div className="flex">
          <Input
            onChange={setModel}
            value={model}
            text={"Modelo"}
            placeholder={"Modelo"}
            type="text"
            className="m-4"
            id={"model"}
          />
          <Input
            onChange={setColor}
            value={color}
            text={"Cor"}
            placeholder={"Cor"}
            type="text"
            className="m-4"
            id={"color"}
          />
        </div>
        <Input
          onChange={setCharacteristics}
          value={characteristics}
          text={"Características"}
          placeholder={"Características"}
          type="text"
          className="m-4"
          id={"color"}
        />
        <div className=" flex justify-end m-4">
          <Button
            type=""
            onClick={() => props.onClose && props.onClose()}
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
