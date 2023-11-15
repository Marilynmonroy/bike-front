import { Bicycle, Customer, Order } from "@/interface";
import Input from "../../Input";
import { useEffect, useState } from "react";
import Titulo from "../../Titulo";
import Button from "../../Button";
import bikeAPI from "@/axios/instance";
import Select from "@/components/Select";
import CustomersData from "../customer/customersData";
import BicycleData from "../bicycles/bicyclesData";

interface formProps {
  order?: Order;
  customer?: Customer;
  bicycle?: Bicycle;
  onClose?: () => void;
}

export default function FormOrder(props: formProps) {
  const [description, setDescription] = useState(
    props.order?.description ?? ""
  );
  const [status, setStatus] = useState(
    props.order?.status ? "completo" : "incompleto"
  );
  const [value, setValue] = useState(props.order?.value ?? "");
  const [customerEmail, setCustomerEmail] = useState<Customer[] | null>(null);
  const [bicycleId, setBicycleId] = useState<Bicycle[] | null>(null);
  const [selectCustomer, setSelectCustomer] = useState<Customer | null>();
  const [selectBicycle, setSelectBicycle] = useState<Bicycle | null>();

  useEffect(() => {
    bikeAPI
      .get("customers")
      .then((res) => {
        setCustomerEmail(res.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });

    bikeAPI
      .get("bicycles")
      .then((res) => {
        setBicycleId(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = {
      description,
      status: false,
      value,
      customerEmail: selectCustomer?.email,
      bicycleId: selectBicycle?.id,
    };

    bikeAPI
      .post("orders", order)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  return (
    <>
      {/* Datos de order */}
      <form className="mb-3" onSubmit={handleSubmit}>
        <Titulo>Detalhes</Titulo>
        <div>
          <div className="flex w-full">
            <Select
              onChange={(e) => {
                const email = customerEmail?.find(
                  (x) => x.email === e.target.value
                );
                setSelectCustomer(email);
              }}
              tittle={"Cliente"}
              placeholder="Seleccione un cliente"
              className="m-4 w-6/12"
            >
              <option>Selecione um cliente</option>
              {customerEmail
                ? customerEmail?.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.email}>
                        {customer.email}
                      </option>
                    );
                  })
                : null}
            </Select>

            <Select
              onChange={(e) => {
                const id = bicycleId?.find(
                  (x) => x.id === parseInt(e.target.value)
                );
                setSelectBicycle(id);
              }}
              tittle={"Bike"}
              placeholder="Seleccione una bike"
              className="m-4 w-6/12"
            >
              <option>Selecione uma bike</option>
              {bicycleId
                ? bicycleId?.map((bike) => {
                    return (
                      <option key={bike.id} value={bike.id}>
                        {bike.id}
                      </option>
                    );
                  })
                : null}
            </Select>
          </div>
        </div>
        <div>
          <Input
            onChange={setDescription}
            value={description}
            text={"Descrição"}
            placeholder={"Descrição"}
            type="text"
            className="m-4"
            id={"description"}
          />

          <div className="flex">
            <Select
              onChange={setStatus}
              tittle={"Status"}
              placeholder={"Status"}
              className="m-4 w-6/12"
            >
              <option value="">Incompleto</option>
              <option value="">Completo</option>
            </Select>

            <Input
              onChange={setValue}
              value={+value}
              text={"Valor"}
              placeholder={"Valor"}
              type="text"
              className="m-4"
              id={"value"}
            />
          </div>
        </div>
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
