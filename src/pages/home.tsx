import "../styles/globals.css";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import FormCustomer from "@/components/forms/customer/FormCustomer";
import FormBicycle from "@/components/forms/bicycles/FormBicycle";
import { Order } from "@/interface";
import { useEffect, useState } from "react";
import bikeAPI from "@/axios/instance";
import FormOrder from "@/components/forms/orders/FormOrder";
import { useAuth } from "@/hooks/auth.hook";
import UserMenu from "@/components/User";
import Modal from "@/components/Modal";

export default function Home() {
  useAuth();
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
    setModalContent(
      <FormCustomer
        onClose={() => setModal(false)}
        order={order}
        isUpdate={true}
        onNextStep={() => {
          setModalContent(
            <FormBicycle
              onClose={() => setModal(false)}
              order={order}
              isUpdate={true}
              onNextStep={() => {
                setModalContent(
                  <FormOrder
                    onClose={() => setModal(false)}
                    order={order}
                    isUpdate={true}
                  />
                );
              }}
            />
          );
        }}
      />
    );
    setModal(true);
  }

  function orderDeleted(order: Order) {
    bikeAPI
      .delete(`orders/${order.id}`)
      .then((res) => {
        console.log("Orden eliminada:", order);
        bikeAPI.get("orders").then((res) => {
          setData(res.data);
        });
      })
      .catch((error) => {
        console.error("Error al eliminar la orden:", error);
      });
  }

  function orderDownload(order: Order) {
    console.log(order.customer);
  }

  function orderEmail(order: Order) {}

  return (
    <div
      className={`flex flex-col h-screen
      bg-gray-900 text-white p-10
    `}
    >
      <div></div>
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
            orderEmail={orderEmail}
          />
        </Layout>
        <Modal visible={modal}>{modalContent}</Modal>
      </div>
    </div>
  );
}
