// =========================================
// script.js - Funções de Interatividade
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado. Iniciando scripts interativos.");

    // Seleciona os inputs onde as máscaras serão aplicadas
    const inputCpf = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCep = document.getElementById('cep');
    const formCadastro = document.querySelector('form');

    // =========================================
    // 1. FUNÇÕES DE MÁSCARA
    // O JavaScript é necessário para formatar o texto em tempo real (máscara).
    // O atributo 'pattern' no HTML continua sendo a validação final.
    // =========================================

    /**
     * Aplica a máscara de CPF (999.999.999-99)
     * @param {Event} event - O evento de input
     */
    function aplicarMascaraCpf(event) {
        let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
        
        // Aplica a máscara: 123.456.789-01
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        
        event.target.value = valor;
    }

    /**
     * Aplica a máscara de Telefone ((99) 99999-9999)
     * @param {Event} event - O evento de input
     */
    function aplicarMascaraTelefone(event) {
        let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

        // Aplica a máscara: (11) 99999-9999 ou (11) 9999-9999
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen antes dos 4 últimos dígitos
        
        event.target.value = valor;
    }

    /**
     * Aplica a máscara de CEP (99999-999)
     * @param {Event} event - O evento de input
     */
    function aplicarMascaraCep(event) {
        let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (valor.length > 8) valor = valor.slice(0, 8); // Limita a 8 dígitos

        // Aplica a máscara: 12345-678
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2'); 

        event.target.value = valor;
    }

    // Adiciona os event listeners para as máscaras
    if (inputCpf) {
        inputCpf.addEventListener('input', aplicarMascaraCpf);
    }
    if (inputTelefone) {
        inputTelefone.addEventListener('input', aplicarMascaraTelefone);
    }
    if (inputCep) {
        inputCep.addEventListener('input', aplicarMascaraCep);
    }


    // =========================================
    // 2. VALIDAÇÃO CUSTOMIZADA (EXEMPLO)
    // Mostra como interceptar o envio do formulário para validações mais complexas.
    // =========================================

    if (formCadastro) {
        formCadastro.addEventListener('submit', function(event) {
            
            // 1. Bloqueia o envio padrão do formulário
            event.preventDefault(); 
            
            // 2. Validação Simples de Exemplo: Nome
            const inputNome = document.getElementById('nome_completo');
            if (inputNome && inputNome.value.trim().split(' ').length < 2) {
                alert('O nome completo deve conter pelo menos um nome e um sobrenome.');
                inputNome.focus();
                return; // Impede o envio
            }

            // 3. Validação mais complexa: Idade Mínima
            const inputNascimento = document.getElementById('nascimento');
            if (inputNascimento && !verificarIdadeMinima(inputNascimento.value, 16)) {
                alert('É necessário ter no mínimo 16 anos para se cadastrar como voluntário.');
                inputNascimento.focus();
                return; // Impede o envio
            }
            
            // 4. Se todas as validações de JS e HTML passarem, o formulário pode ser enviado.
            console.log("Formulário validado com sucesso pelo JavaScript!");
            
            // Simulação de envio
            alert("Cadastro enviado com sucesso! (Isso seria o envio real para o servidor)");
            // formCadastro.submit(); // Descomente para enviar de verdade
        });
    }

    /**
     * Verifica se a data de nascimento atende a uma idade mínima.
     * @param {string} dataNascimento - Data de nascimento no formato YYYY-MM-DD.
     * @param {number} idadeMinima - A idade mínima exigida.
     * @returns {boolean} - True se a pessoa for mais velha ou tiver a idade mínima.
     */
    function verificarIdadeMinima(dataNascimento, idadeMinima) {
        if (!dataNascimento) return false;

        const dataNasc = new Date(dataNascimento);
        const hoje = new Date();
        
        // Calcula a idade da pessoa
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mes = hoje.getMonth() - dataNasc.getMonth();

        // Ajusta a idade se ainda não fez aniversário no ano atual
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }

        return idade >= idadeMinima;
    }

});

// =========================================
// FIM DO SCRIPT
// =========================================