import React, { useState} from "react";
import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import PizzaCard from "../components/PizzaCrudCard";
import PizzaDialog from "../components/PizzaDialog";
import initialPizzas from "../components/PizzaData";


const Admin = () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [pizzas, setPizzas] = useState(initialPizzas);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleOpenCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleOpenEdit = (pizza) => {
    setEditing(pizza);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja deletar essa pizza?")) return;
    setPizzas((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (data) => {
    if (editing) {
      setPizzas((prev) => prev.map((p) => (p.id === editing.id ? { ...data, id: editing.id } : p)));
    } else {
      const nextId = pizzas.length ? Math.max(...pizzas.map((p) => p.id)) + 1 : 1;
      setPizzas((prev) => [...prev, { ...data, id: nextId }]);
    }
    setOpen(false);
  };


  return (
    <>
      {/*vou fazer um componente que avisa que ele não tem acesso a essa pagina*/}
      {!(usuarioLogado.tipo === "admin") &&(
        <div>não tenho acesso</div>
      )}
      {(usuarioLogado.tipo === "admin") &&(
        <Box p={2} >
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} >
            <Typography variant="h5" color="rgba(53, 53, 53, 1)">Inventário Cardápio de Pizzas</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} color="error">
              Nova Pizza
            </Button>
          </Stack>

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {pizzas.map((pizza) => (
              <Grid
                key={pizza.id} item
                xs={12} sm={6} md={4}
                display="flex"
                justifyContent="center"
              >
                <PizzaCard pizza={pizza} onEdit={handleOpenEdit} onDelete={handleDelete}/>
              </Grid>
            ))}
          </Grid>


          {open && (
            <PizzaDialog
              open={open}
              onClose={() => setOpen(false)}
              onSave={handleSave}
              editing={editing}
            />
          )}
        </Box>
      )}
    </>
  )
}

export default Admin