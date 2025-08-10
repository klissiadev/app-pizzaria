import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

const statusColors = {
  mesa: "warning",
  entrega: "success",
};

const actionColors = {
  Novo: "rgba(61, 122, 255, 1)",
  "Em preparo": "rgba(231, 129, 44, 1)",
  Entrege: "rgba(52, 185, 52, 1)",
  Servido: "rgba(116, 59, 59, 1)",
};

export default function OrderCard({ pedido, onStatusChange, onDetalhesClick }) {
  const mudarStatusEDetalhes = async (pedido) => {
    try {
      await fetch(`http://localhost:3001/pedidos/${pedido.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Em preparo" }),
      });
      if (onStatusChange) onStatusChange();
      if (onDetalhesClick) onDetalhesClick(pedido);
    } catch (err) {
      console.error("Erro ao mudar status:", err);
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign:"left"}}>
            Pedido #{pedido.id}{" "}
            <Chip
              label={pedido.tipoEntrega === "mesa" ? "Mesa" : "Entrega"}
              size="small"
              color={statusColors[pedido.tipoEntrega] || "default"}
              sx={{ ml: 1 }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary" width="400px" sx={{wordBreak: "break-word", textAlign: "left"}}>
            {pedido.itens.map(i => `${i.quantidade}x ${i.nome} (${i.tamanho})`).join(", ")}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100px",
            bgcolor: actionColors[pedido.status] || "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "sans-serif",
            p: 1,
            borderRadius: 1,
          }}
        >
          {pedido.status}
        </Box>

        <Button
          variant="outlined"
          size="small"
          color="error"
          sx={{ p: 1 }}
          onClick={() => mudarStatusEDetalhes(pedido)}
        >
          Detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
