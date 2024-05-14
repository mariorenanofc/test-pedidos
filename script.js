function finalizarPedido() {
            // Obter valores do formulário
            var nome = document.getElementById('nome').value;
            var endereco = document.getElementById('endereco').value;
            var itens = [];
            var total = 0;
            var formaPagamento = 'Pix';

            // Verificar quais itens foram selecionados
            var checkboxes = document.querySelectorAll('input[name="itens"]:checked');
            checkboxes.forEach(function(checkbox) {
                itens.push(checkbox.value);
                // Adicione o valor do item ao total
                total += calcularValorItem(checkbox.value);
            });

            // Adicione o valor da entrega ao total
            total += 2.00; // Supondo uma taxa de entrega fixa

            // Formatar mensagem para o WhatsApp
            var mensagem = `🧾 Olá, sou ${nome}. 😊\n\nGostaria de fazer meu pedido!\n\nMeus itens são:\n`;
            itens.forEach(function(item) {
                mensagem += `🍔 ${item}\n`;
            });
            mensagem += `\n🛵 Vai ser delivery: ${endereco}.\n\n🛒 Valor total de meu pedido de R$ ${total.toFixed(2)}.\n\n💰 O meio de pagamento vai ser no ${formaPagamento}.`;

            // Abre o link do WhatsApp com a mensagem formatada
    var linkWhatsapp = `https://api.whatsapp.com/send?phone=5587999061405&text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsapp);

        function calcularValorItem(item) {
            // Aqui você pode implementar a lógica para calcular o valor de cada item do cardápio
            // Se for um exemplo simples, você pode usar valores fixos para cada item
            var valores = {
                'x-bacon': 14.99,
                'x-salada': 12.99,
                'Coca cola lata 250ml': 5.99
            };
            return valores[item] || 0;
        }

        // Redireciona para o WhatsApp se estiver em um dispositivo móvel
        if (isMobileDevice()) {
            window.location.href = linkWhatsapp;
        } else {
            alert('Por favor, abra esta página em um dispositivo móvel para enviar o pedido pelo WhatsApp.');
        }

        enviarPedido();
    }

    // Função para verificar se o usuário está em um dispositivo móvel
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }