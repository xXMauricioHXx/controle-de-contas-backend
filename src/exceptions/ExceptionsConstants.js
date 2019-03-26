module.exports = Object.freeze({
    //USUARIO
    USUARIO_SEM_PERMISSAO_DE_ACESSO: {
        message: 'Usuário não possuí permissão de acesso',
        code: "0001"
    },
    USUARIO_NAO_CADASTRADO_NO_SISTEMA: {
        message: 'Usuário não cadastrado no sistema',
        code: "0002"
    },
   
    //CONTA
    CONTA_NAO_CADASTRADA_NO_SISTEMA: {
        message: 'Conta não cadastrada no sistema',
        code: "0100"
    },
    
    //TOKEN
    TOKEN_DE_ACESSO_INVALIDO_OU_MODIFICADO: {
        message: 'Token de acesso inválido ou modificado',
        code: "0200"
    },
    TOKEN_DE_ACESSO_NAO_ENVIADO: {
        message: 'Token de acesso não enviado',
        code: "0201"
    },
    
    //CARTAO
    CARTAO_NAO_CADASTRADO_NO_SISTEMA: {
        message: 'Cartão não cadastrado no sistema',
        code: "0300"
    },

    NENHUM_REGISTRO_ENCONTRADO_COM_O_ID_INFORMADO: {
        message: 'Nenhum registro encontrado com o ID informado',
        code: "0500"
    }
})
