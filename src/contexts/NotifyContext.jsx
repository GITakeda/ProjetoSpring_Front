import React, { createContext } from 'react';

const NotifyContext = createContext({
    notify:semNotificacao
    }
);

function semNotificacao(dados){
    console.log(dados + "/ notificações não implementadas");
}

export default NotifyContext;