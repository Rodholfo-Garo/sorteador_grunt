/* DOMContentLoaded permite que o código seja executado apenas depois que todo o arquivo seja carregado*/

document.addEventListener('DOMContentLoaded', function(){

    /* Recuperar Formulario */
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){
        evento.preventDefault();
        /* Recuperar valor Maximo */
        let mumeroMaximo=document.getElementById('numero-maximo').value;
        mumeroMaximo=parseInt(mumeroMaximo);

        let numeroAleatorio = Math.random()*mumeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1);

        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display='block';
    })
})