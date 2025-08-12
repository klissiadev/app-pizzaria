import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Stack } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const PizzaCrudCard = ({ pizza, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" , alignItems:"center", pb:1}}>
      <CardMedia component="img" height="160" image={pizza.imagem} alt={pizza.nome} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{pizza.nome}</Typography>
          <Chip label={pizza.categoria} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {pizza.ingredientes.join(", ")}
        </Typography>
        <Typography variant="subtitle1" mt={2} fontWeight={700}>
          R$ {pizza.preco.toFixed(2)}
        </Typography>
      </CardContent>
        <CardActions>
        <Button variant="contained"  color="success" onClick={() => onEdit(pizza)}>Editar</Button>
        <Button variant="contained"  color="error" onClick={() => onDelete(pizza.id)}>Deletar</Button>
      </CardActions>
    </Card>
  );
}

export default PizzaCrudCard;