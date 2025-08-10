import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  return (
    <>
      {/*vou fazer um componente que avisa que ele não tem acesso a essa pagina*/}
      {!(usuarioLogado.tipo === "admin") &&(
        <div>não tenho acesso</div>
      )}
    </>
  )
}

export default Admin