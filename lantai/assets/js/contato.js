/*
--------------------------------
Contato
--------------------------------
*/

$(document).ready(function(){

    /* Contato */
    $('#caracteres').text('300 caracteres restantes');
    $('#formMensagem').keydown(function () {
        var max = 300;
        var len = $(this).val().length;
        if (len >= max) {
            $('#caracteres').text('Você atingiu o limite de caracteres');
            $('#caracteres').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#caracteres').text(ch + ' caracteres restantes');
            $('#btnSubmit').removeClass('disabled');
            $('#caracteres').removeClass('red');            
        }
    }); 

    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

    $('#formTelefone').mask(SPMaskBehavior, spOptions);



    var $form = $('#formularioContato');


    $form .validate({
    // Define as regras
    rules:{
        formNome:{
             // campoNome será obrigatório (required) e terá tamanho mínimo (minLength)
             required: true
         },
         formEmail:{
                // campoEmail será obrigatório (required) e precisará ser um e-mail válido (email)
                required: true, email: true
            },
            formMensagem:{
                // campoMensagem será obrigatório (required) e terá tamanho mínimo (minLength)
                required: true
            }
        },
    // Define as mensagens de erro para cada regra
    messages:{
        formNome:{
            required: "Preencha corretamente o nome"
        },
         formProfissao:{
            required: "Preencha corretamente a profissão"
        },

        formEmail:{
            required: "Preencha corretamente o e-mail",
            email: "Digite um e-mail válido"
        },

        formTelefone:{
            required: "Preencha corretamente o telefone"
        },

        formAssunto:{
            required: "Preencha corretamente o assunto"
        },

        formMensagem:{
            required: "Preencha corretamente a mensagem"
        }
    },
    submitHandler: function (form) {
        // get the form data
        var formData = {
            'nome' : $('input[name="formNome"]').val(),
            'email' : $('input[name="formEmail"]').val(),
            'telefone' : $('input[name="formTelefone"]').val(),
            'assunto' : $('input[name="formAssunto"]').val(),
            'mensagem' : $('textarea[name="formMensagem"]').val()
        };

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'processa.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            // handle errors
            if (data.success) {
                 var options = {

                 };
              $('[data-remodal-id=alert]').remodal(options).open();

              $('.remodal h1').html(data.title);
              $('.remodal p').html(data.message);
              document.getElementById('formNome').value='';
              document.getElementById('formEmail').value='';
              document.getElementById('formTelefone').value='';
              document.getElementById('formAssunto').value='';
              document.getElementById('formMensagem').value='';
          } 
      }).fail(function (data) {
            // for debug
            console.log(data)
        });

      return false;
  }


});

});   

