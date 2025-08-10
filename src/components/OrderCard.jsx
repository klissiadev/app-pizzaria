import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

const statusColors = {
  Mesa: "warning",
  Entrega: "success",
};

const actionColors = {
  "Novo": "rgba(61, 122, 255, 1)",
  "Em preparo": "rgba(231, 129, 44, 1)",
  "Entrege": "rgba(52, 185, 52, 1)",
  "Servido": "rgba(116, 59, 59, 1)"
};


  function mudarStatus(idPedido) {
    fetch(`http://localhost:3001/pedidos/${idPedido}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Em preparo" })
    })
      .then(res => res.json())
      .then(() => {
        if (onStatusChange) onStatusChange(); // avisa o pai para atualizar
      })
      .catch(err => console.error("Erro ao mudar status:", err));
  }


export default function OrderCard({ pedido, onStatusChange }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Pedido #{pedido.id}{" "}
            <Chip
              label={pedido.type}
              size="small"
              color={statusColors[pedido.type] || "default"}
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pedido.items.join(", ")}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100px",
            bgcolor: actionColors[pedido.status] || "primary",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily:"sans-serif",
            p:1
          }}
        >
          {pedido.status}
        </Box>

        <Box sx={{ display: "flex", gap: 3}}>
          <Button variant="outlined" color="error" size="small" sx={{p:1}} onClick={() => mudarStatus(pedido.id)}>
            Detalhes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
