import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import OrdersList from "../components/OrderList";

const Cozinha = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [tab, setTab] = useState(0);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/pedidos")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(
          data.map((p) => ({
            id: p.id,
            type: p.tipoEntrega === "mesa" ? `Mesa ${p.numeroMesa}` : "Entrega",
            status: p.status,
            items: p.itens.map(
              (item) => `${item.quantidade}x ${item.nome} (${item.tamanho})`
            ),
          }))
        );
      })
      .catch((err) => console.error("Erro ao carregar pedidos:", err));
  }, []);

  function atualizarPedidos() {
    fetch("http://localhost:3001/pedidos")
      .then(res => res.json())
      .then(data => {
        setPedidos(
          data.map(p => ({
            id: p.id,
            type: p.tipoEntrega === "mesa" ? `Mesa ${p.numeroMesa}` : "Entrega",
            status: p.status,
            items: p.itens.map(item => `${item.quantidade}x ${item.nome} (${item.tamanho})`)
          }))
        );
      });
  }

  const filteredOrders = () => {
    if (tab === 0) return pedidos;
    if (tab === 1) return pedidos.filter((o) => o.status === "Novo");
    if (tab === 2) return pedidos.filter((o) => o.status === "Em preparo");
    return [];
  };

  if (!(usuarioLogado?.tipo === "funcionario")) {
    return <div>Não tenho acesso</div>;
  }

  return (
    <Box sx={{ p: 2, display: "flex", gap: 2 }}>
      <Paper sx={{ flex: 1, p: 1 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="#c40f0fff"
          sx={{
            "& .Mui-indicator":{color:"#c40f0fff"},
            "& .MuiTab-root": { color: "#FF5A5F" },
            "& .Mui-selected": { color: "#c40f0fff", fontWeight:"bold" },
            "& .MuiTabs-indicator": { backgroundColor: "#FF5A5F" },
          }}
        >
          <Tab label="Tudo" />
          <Tab label="Novo" />
          <Tab label="Em preparo" />
        </Tabs>
        <OrdersList pedidos={filteredOrders()} onStatusChange={atualizarPedidos()} />
      </Paper>

      <Paper sx={{ width: 400, height: 120 }} elevation={3}></Paper>
    </Box>
  );
};

export default Cozinha;
