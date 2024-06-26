import React from 'react';
import './style.css';

function Solicitacoes({ solicitacoes, handleAcceptRequest, handleRemoveRequest }) {
  return (
    <div className="solicitacoes-container">
      <h2>Solicitações</h2>
      <ul>
        {solicitacoes.map((solicitacao, index) => (
          <li key={index}>
            <div> 
              <strong>{solicitacao.nome}</strong>
              <br />
              {solicitacao.titulacao} 
            </div>
            <div>
              <button onClick={() => handleAcceptRequest(solicitacao.id)}>Aceitar</button>
              <button onClick={() => handleRemoveRequest(solicitacao.id)}>Recusar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Solicitacoes;