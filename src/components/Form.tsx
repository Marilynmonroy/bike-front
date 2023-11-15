import { Order } from "@/interface";
import FormOrder from "./forms/orders/FormOrder";
import FormBicycle from "./forms/bicycles/FormBicycle";
import FormCustomer from "./forms/customer/FormCustomer";
import Button from "./Button";
import Modal from "@/components/modal";
import { useState } from "react";
import Titulo from "./Titulo";

interface formProps {
  order?: Order;
  onClose?: () => void;
}

export default function Form(props: formProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",

    model: "",
    color: "",
    characteristics: "",

    description: "",
    status: "",
    value: 0,
  });
  const FormTitles = ["Clientes", "Bikes", "Detalhes"];
  const StepDisplay = () => {
    if (step === 0) {
      return <FormCustomer />;
    } else if (step === 1) {
      return <FormBicycle />;
    } else {
      return <FormOrder />;
    }
  };

  return (
    <>
      <div>
        <Titulo>{FormTitles[step]}</Titulo>
        <div>{StepDisplay()}</div>
        <div className="grid grid-cols-6 m-4">
          <div className="col-start-1 col-end-3">
            <Button
              onClick={() => props.onClose}
              className="border border-slate-400 text-gray-900 px-4 py-2 rounded-md mr-2 hover:border-pink-400"
            >
              Cancelar
            </Button>
          </div>
          <div className="col-end-7 col-span-2">
            <Button
              disabled={step === 0}
              className="border border-slate-400 text-gray-900 px-4 py-2 rounded-md mr-2 hover:border-pink-400"
              onClick={() => {
                setStep((currStep) => currStep - 1);
              }}
            >
              Voltar
            </Button>
            <Button
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-500"
              onClick={() => {
                if (step === FormTitles.length - 1) {
                  console.log(formData);
                  alert("Ordem feita");
                } else {
                  setStep((currStep) => currStep + 1);
                }
              }}
            >
              {step === FormTitles.length - 1 ? "Submit" : "Próximo"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
