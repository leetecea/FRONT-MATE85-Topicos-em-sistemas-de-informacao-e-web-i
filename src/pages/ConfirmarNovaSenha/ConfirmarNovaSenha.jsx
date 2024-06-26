import "./styles.css";

const ConfirmarNovaSenha = () => {
  const logoPgcop = "assets/logoPgcop.png";

  return (
    <div className="container">
      <div className="containerCard gap">
        <img src={logoPgcop} width={130} />
        <div className="box">
          <h1>Senha atualizada!</h1>
          <p>Sua senha foi atualizada com sucesso.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarNovaSenha;
