import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import "./Login.css";

const Login = () => {
    // --- Estados do Componente ---
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const response = await axios.get('/api/usuarios.json');
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao carregar os usuários:", error);
                setErro("Falha ao carregar dados de autenticação.");
            }
        };

        carregarUsuarios();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro(''); 

        const usuarioEncontrado = usuarios.find(
            
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
            const fakeToken = btoa(`${usuarioEncontrado.email}:${new Date().getTime()}`)

            const usuarioAutenticado = {
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                tipo: usuarioEncontrado.tipo,
                token: fakeToken,
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAutenticado));

            login(usuarioAutenticado);

            switch (usuarioEncontrado.tipo) {
                case 'admin' :
                    navigate("/pages/'admin");
                    break;

                case 'funcionario':
                    navigate("pages/HomeFuncionario")
                    break;

                case 'cliente':
                    navigate("pages/HomeCliente")
                    break;
            }
        } else {
            setErro("E-mail ou senha inválidos.");
        }
    };

    return (
        <div className="login-container-fade-in">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {erro && <p className='erro'>{erro}</p>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <div className="senha-wrapper">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            id='senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button
                            type='button'
                            className='toggle-senha'
                            onClick={() => setMostrarSenha((prev) => !prev)}
                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                        >
                        </button>
                    </div>
                </div>
                <button type='submit' className='botao'>Entrar</button>
            </form>
        </div>
    );
}

export default Login;