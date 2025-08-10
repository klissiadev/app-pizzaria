import React from "react";
import OrderCard from "./OrderCard";

export default function OrdersList({ pedidos, onStatusChange }) {
  return (
    <div>
      {pedidos.map((pedido) => (
        <OrderCard key={pedido.id} pedido={pedido}  onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
