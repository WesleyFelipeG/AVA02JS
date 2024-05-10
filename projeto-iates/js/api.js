function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(mensagem) {

    /*

    var mensagem = {
            nome: "nome da pessoa", 
            email: "email informado", 
            mensagem: "a mensagem informada"} 

    */

    var inserir = $.ajax({

        url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

$(document).ready(function() {
    $('#envio').click(function(e) {
        e.preventDefault();

        var nome = $('#nome').val();
        var email = $('#email').val();
        var mensagem = $('#msg').val();

        var objMensagem = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        inserirMensagem(objMensagem);

        $('#nome').val('');
        $('#email').val('');
        $('#msg').val('');

        alert('Mensagem enviada.');
    });
});

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'

    /*

    var objLoginSenha = {
            email: "email informado", 
            senha: "senha informada"} 

    */

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();

        var email = $('#email').val();
        var senha = $('#senha').val();

        var objLoginSenha = {
            email: email,
            senha: senha
        };

        var validado = validarUsuario(objLoginSenha);

        if (validado) {
            window.location.href = 'mensagens.html';
        } else {
            $('#mensagem').text('E-mail e Senha inválidos');
        }
    });
});

$(document).ready(function() {
    var mensagens = obterMensagens();

    mensagens.forEach(function(mensagem) {
        $('#mensagens-table tbody').append(
            '<tr>' +
            '<td>' + mensagem.nome + '</td>' +
            '<td>' + mensagem.email + '</td>' +
            '<td>' + mensagem.mensagem + '</td>' +
            '</tr>'
        );
    });
});
