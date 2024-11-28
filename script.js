document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário para processar os dados

    // Captura os dados do formulário
    const nome = document.getElementById("nome").value;

    // Captura os sabores selecionados e suas quantidades
    const pedidos = Array.from(document.querySelectorAll('input[name="pedido"]:checked'))
                          .map(checkbox => {
                              const sabor = checkbox.value;
                              const quantidade = document.querySelector(`input[name="quantidade_${sabor}"]`).value || 0; // Pega a quantidade, se informada
                              return `${sabor} - Quantidade: ${quantidade}`;
                          });

    const observacao = document.getElementById("observacao").value;

    // Verifica se o nome e ao menos um sabor foram selecionados
    if (!nome || pedidos.length === 0) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Cria a mensagem que será enviada para o WhatsApp
    let mensagem = `*Pedido de ${nome}*\n\n`;
    mensagem += `Pedidos:\n${pedidos.join('\n')}\n\n`; // Adiciona todos os sabores selecionados com suas quantidades
    if (observacao) {
        mensagem += `Observações: ${observacao}\n`;
    }

    // Substitua o número abaixo pelo número de WhatsApp do proprietário
    const numeroWhatsApp = "5585987664988"; // Exemplo: 55 + DDD + número

    // Cria o link para enviar a mensagem via WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Verifica se o link foi gerado corretamente
    if (linkWhatsApp) {
        // Redireciona para o WhatsApp com a mensagem pré-preenchida
        window.open(linkWhatsApp, "_blank");
    } else {
        alert("Erro ao gerar o link para o WhatsApp.");
    }
});
