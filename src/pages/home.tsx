import "../styles/globals.css";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import FormCustomer from "@/components/forms/customer/FormCustomer";
import FormBicycle from "@/components/forms/bicycles/FormBicycle";
import { Order } from "@/interface";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import bikeAPI from "@/axios/instance";
import FormOrder from "@/components/forms/orders/FormOrder";
import { useAuth } from "@/hooks/auth.hook";

export default function Home() {
  //useAuth();
  //Hooks
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [modalContent, setModalContent] = useState<React.ReactElement | null>(
    null
  );

  // Request API
  useEffect(() => {
    bikeAPI.get("orders").then((res) => {
      setData(res.data);
    });
  }, []);

  //Funcion actions
  function orderUpdate(order: Order) {
    console.log(order.customer);
    setModal(true);
  }
  function orderDeleted(order: Order) {
    console.log(order);
  }

  function orderDownload(order: Order) {
    console.log(order.customer);
  }

  return (
    <>
      <div
        className={`flex flex-col h-screen
      bg-gray-900 text-white
    `}
      >
        <div className="flex justify-center items-center h-screen">
          <Layout titulo="Ordens bikes">
            <div className="grid grid-cols-6 m-4">
              <div className="col-star-7 col-span-5">
                <Button
                  onClick={() => {
                    setModalContent(
                      <FormCustomer onClose={() => setModal(false)} />
                    );
                    setModal(true);
                  }}
                  className={`m-4 bg-pink-600 text-white px-4 py-2 rounded-md`}
                >
                  Novo cliente
                </Button>
                <Button
                  onClick={() => {
                    setModalContent(
                      <FormBicycle onClose={() => setModal(false)} />
                    );
                    setModal(true);
                  }}
                  className={`m-4 bg-pink-600 text-white px-4 py-2 rounded-md`}
                >
                  Nova bike
                </Button>
              </div>
              <div className="col-end">
                <Button
                  onClick={() => {
                    setModalContent(
                      <FormOrder onClose={() => setModal(false)} />
                    );
                    setModal(true);
                  }}
                  className={`m-4 bg-pink-600 text-white px-4 py-2 rounded-md`}
                >
                  Nova ordem
                </Button>
              </div>
            </div>
            <Table
              orders={data}
              orderUpdate={orderUpdate}
              orderDelete={orderDeleted}
              orderDownload={orderDownload}
            />
          </Layout>
          <Modal visible={modal}>{modalContent}</Modal>
        </div>
      </div>
    </>
  );
}
