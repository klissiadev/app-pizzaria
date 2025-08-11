import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Cardapio = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [pizzas, setPizzas] = useState([]);
  const [filtrosAtivos, setFiltrosAtivos] = useState([]);

  const botoes = [
    { id: 1, label: "Tradicional" },
    { id: 2, label: "Vegetariano" },
    { id: 3, label: "Especialidade" },
    { id: 4, label: "Doce" },
  ];

  const handleClick = (id) => {
    if (filtrosAtivos.includes(id)) {
      setFiltrosAtivos(filtrosAtivos.filter((filtroId) => filtroId !== id));
    } else {
      setFiltrosAtivos([...filtrosAtivos, id]);
    }
  };

  useEffect(() => {
    axios
      .get("/db-pizzas")
      .then((response) => {
        console.log("Response completa:", response.data); //debug
        console.log("Array pizzas:", response.data.pizzas);
        setPizzas(response.data.pizzas || []);
      })
      .catch((error) => {
        console.error("Erro ao carregar as pizzas:", error);
      });
  }, []);

  const pizzasFiltradas =
    filtrosAtivos.length > 0
      ? pizzas.filter((pizza) =>
          filtrosAtivos.some(
            (filtroId) =>
              pizza.categoria ===
              botoes.find((b) => b.id === filtroId)?.label
          )
        )
      : pizzas;

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#558858ff" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Cardápio!</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip label="#3450" sx={{ bgcolor: "#ffeaea" }} />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#a5140a",
                "&:hover": { bgcolor: "#9a3730ff" },
              }}
            >
              Finalizar Pedido
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap" }}>
        {botoes.map(({ id, label }) => (
          <Button
            key={id}
            variant={filtrosAtivos.includes(id)? "contained" :"outlined"}
            onClick={() => handleClick(id)}
            sx={{
              bgcolor: filtrosAtivos.includes(id) ? "#0d7212ff" : "#fafafaff",
              color: filtrosAtivos.includes(id) ? "#ffffffff" : "#0d7212ff",
              borderColor: "#0d7212ff",
              borderRadius: "10px",
              p: 1,
              "&:hover": {
                bgcolor: filtrosAtivos.includes(id) ? "#0f8c23" : "#209926b1",
              },
            }}
          >
            {label}
          </Button>
        ))}

        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      <Grid>
        {pizzasFiltradas.length > 0 ? (
          pizzasFiltradas.map((pizza) => (
            <Grid item xs={12} sm={6} md={3} key={pizza.id}>
              <Card sx={{ border: "1px solid #ff9999" }}>
                <CardMedia
                  component="img"
                  sx={{ height: 140, bgcolor: "#ccc" }}
                  image={pizza.imagem}
                  alt={pizza.nome}
                />
                <CardContent>
                  <Typography variant="h6">{pizza.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pizza.descricao || pizza.ingredientes?.join(", ") || ""}
                  </Typography>
                  <Typography sx={{ color: "red", fontWeight: "bold" }}>
                    R$
                    {pizza.preco
                      ? pizza.preco.toFixed(2).replace(".", ",")
                      : "0,00"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "red",
                      "&:hover": { bgcolor: "#d10000" },
                    }}
                    fullWidth
                  >
                    Pedir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ p: 2 }}>Nenhuma pizza encontrada.</Typography>
        )}
      </Grid>

      {usuarioLogado?.tipo === "cliente" && (
        <Typography align="center" sx={{ p: 2 }}>
          Sou cliente
        </Typography>
      )}
    </Box>
  );
};

export default Cardapio;