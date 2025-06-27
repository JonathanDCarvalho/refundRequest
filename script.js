// Projeto Refund - Solicitação de Reembolso.

// Seleciona os elementos do formulário.
const amount = document.querySelector("#amount");

amount.addEventListener("input", () => {
	const regex = /\D+/g;
	let value = amount.value.replace(regex, "");

	// Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente à R$ 1,50)
	value = Number(value) / 100;

	// Atualiza o valor do input
	amount.value = formatCurrencyBRL(value);
});

// Formata a moeda no padrão BRL(Real Brasileiro).
function formatCurrencyBRL(value) {
	value = value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return value;
}
