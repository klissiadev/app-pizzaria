import React from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Cardapio = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  return (
    <div>Cardapio
        {/*aqui tu coloca o botão de pedir*/}
        {usuarioLogado.tipo === "cliente" &&(
            <div>sou cliente</div>
        )}
    </div>
  )
}

export default Cardapio