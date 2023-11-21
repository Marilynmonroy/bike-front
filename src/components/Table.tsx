import { Customer, Order } from "@/interface";
import { FiEdit, FiTrash2, FiDownload } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

interface TabelaProps {
  orders?: Order[];
  orderUpdate?: (order: Order) => void;
  orderDelete?: (order: Order) => void;
  orderDownload?: (order: Order) => void;
  orderEmail?: (order: Order) => void;
}

export default function Table(props: TabelaProps) {
  const viewActions =
    props.orderDelete ||
    props.orderDownload ||
    props.orderUpdate ||
    props.orderEmail;

  function renderAction(order: Order) {
    return (
      <td className="flex p-4 justify-center items-center">
        {/* orden seleccionada */}
        {props.orderUpdate ? (
          <button
            onClick={() => props.orderUpdate?.(order)}
            className={` text-green-600 rounded-full p-2 m-1 hover:bg-green-50`}
          >
            <FiEdit />
          </button>
        ) : (
          false
        )}

        {/* orden eliminada */}
        {props.orderDelete ? (
          <button
            onClick={() => props.orderDelete?.(order)}
            className={` text-red-600 rounded-full p-2 m-1 hover:bg-green-50`}
          >
            <FiTrash2 />
          </button>
        ) : (
          false
        )}

        {/*Descargar pdf*/}
        {props.orderDownload ? (
          <button
            onClick={() => props.orderDownload?.(order)}
            className={` text-blue-600 rounded-full p-2 m-1 hover:bg-green-50`}
          >
            <FiDownload />
          </button>
        ) : (
          false
        )}

        {/*Enviar email*/}
        {props.orderEmail ? (
          <button
            onClick={() => props.orderEmail?.(order)}
            className={` text-blue-600 rounded-full p-2 m-1 hover:bg-green-50`}
          >
            <MdOutlineMailOutline />
          </button>
        ) : (
          false
        )}
      </td>
    );
  }
  return (
    <table className="w-full rounded-xl">
      <thead className={`bg-green-500 text-gray-100 rounded-md`}>
        <tr>
          <th className="text-left p-4 rounded-ss-md">ID</th>
          <th className="text-left p-4">Descripção</th>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">Data de crição</th>
          <th className="text-left p-4">Value</th>
          <th className="text-left p-4">Email cliente</th>
          <th className="text-left p-4">ID bike</th>
          {viewActions ? <th className="p-4 rounded-se-md">Ações</th> : false}
        </tr>
      </thead>
      <tbody className={`bg-green-100`}>
        {props.orders?.map((order) => {
          return (
            <tr key={`${order.id}`}>
              <td className="text-left p-4">{order.id}</td>
              <td className="text-left p-4">{order.description}</td>
              <td className="text-left p-4">{order.status}</td>
              <td className="text-left p-4">{order.createdAt}</td>
              <td className="text-left p-4">{order.value}</td>
              <td className="text-left p-4">{order.customer?.email}</td>
              <td className="text-left p-4">{order.bicycleId}</td>
              {viewActions ? renderAction(order) : false}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
