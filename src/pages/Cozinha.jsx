import React from 'react'

const Cozinha = () => {
  return (
    <div>Cozinha
      {/*vou fazer um componente que avisa que ele não tem acesso a essa pagina*/}
      {!(usuarioLogado.tipo === "funcionario") &&(
        <div>não tenho acesso</div>
      )}
    </div>
  )
}

export default Cozinha