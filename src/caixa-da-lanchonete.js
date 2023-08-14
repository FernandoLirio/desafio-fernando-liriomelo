class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.descontos = {
            dinheiro: 0.05,
        };

        this.acrescimos = {
            credito: 0.03,
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        let total = 0;
        const itensPrincipaisPedidos = new Set();

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(",");
            const itemValor = this.cardapio[codigo];

            if (!itemValor) {
                return "Item inválido!";
            }

            if (codigo !== "chantily" && codigo !== "queijo") {
                itensPrincipaisPedidos.add(codigo);
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (codigo.startsWith("combo")) {
                const comboItems = codigo.split("-");
                for (const comboItem of comboItems) {
                    const comboItemValor = this.cardapio[comboItem];
                    if (!comboItemValor) {
                        return "Item inválido!";
                    }
                    total += comboItemValor * quantidade;
                }
            } else {
                total += itemValor * quantidade;
            }

            if (formaDePagamento === "dinheiro") {
                total -= total * this.descontos.dinheiro;
            } else if (formaDePagamento === "credito") {
                total += total * this.acrescimos.credito;
            } else if (formaDePagamento !== "debito") {
                return "Forma de pagamento inválida!";
            }

            const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            return formattedTotal;
        }
    }

}
