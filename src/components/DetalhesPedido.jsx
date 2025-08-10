import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  Chip
} from "@mui/material";

const DetalhesPedido = ({ pedido, onClose }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("/db-pizzas.json")
        .then(res => res.json())
        .then(data => setPizzas(data.pizzas || []))
        .catch(err => console.error("Erro ao carregar pizzas:", err));
    }, []);


  if (!pedido) {
    return (
      <Typography variant="body2" color="text.secondary">
        Selecione um pedido para ver os detalhes
      </Typography>
    );
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Pedido #{pedido.id}{" "}
          <Chip
            label={pedido.tipoEntrega === "mesa" ? "Mesa" : "Entrega"}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Avatar
              src="/imagens/local.png"
              alt="Local"
              variant="square"
              sx={{ width: 24, height: 24 }}
            />
            {pedido.tipoEntrega === "mesa" && (
                <Typography variant="body1">
                    Mesa {pedido.numeroMesa}
                </Typography>
            )}
            {pedido.tipoEntrega === "entrega" && (
                <Typography variant="body1">
                    {pedido.endereco}
                </Typography>
            )}
          </Box>
    

        <Divider sx={{ my: 1 }} />

        {pedido.itens.map((item, idx) => {
          const pizzaInfo = pizzas.find(p => p.id === item.pizzaId);
          return (
            <Box key={idx} display="flex" alignItems="center" gap={2} mb={1}>
                <Typography variant="body2" color="#d32f2f">
                    {item.quantidade}x
                </Typography>
              <Avatar
                src={
                  pizzaInfo
                    ? `/imagens/${pizzaInfo.imagem}`
                    : "/imagens/pizza.png"
                }
                variant="square"
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="body1" fontWeight="bold" textAlign="left">
                  {item.nome}
                </Typography>
                <Typography variant="caption" textAlign="left" sx={{ display: "block" }}>
                  {item.tamanho}
                </Typography>
              </Box>
              <Box ml="auto" textAlign="right">
                {item.observacao && item.observacao.length > 0 && (
                    <Typography variant="caption" textAlign="rigth" sx={{ display: "block" }}>
                        Obs:{" "}
                        {Array.isArray(item.observacao)
                        ? item.observacao.join(", ")
                        : item.observacao}
                    </Typography>
                    )}
                </Box>
            </Box>
          );
        })}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#FF5A5F" }}
          onClick={onClose}
        >
          Fechar
        </Button>
      </CardContent>
    </Card>
  );
};

export default DetalhesPedido;
