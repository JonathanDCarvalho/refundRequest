// Projeto Refund - Solicitação de Reembolso.

// Seleciona os elementos do formulário.
const form = document.querySelector("form");
const lista = document.querySelector("ul");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

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

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
	event.preventDefault();

	// Cria um objeto com os detalhes da nova despesa.
	const newExpense = {
		id: new Date().getTime(),
		expense: expense.value,
		category_id: category.value,
		category_name: category.options[category.selectedIndex].text,
		amount: amount.value,
		created_at: new Date(),
	};

	// Chama a função que irá adicionar o item na lista.
	expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
	try {
		// Cria o elemento para adicionar na lista.
		const li = document.createElement("li");
		li.classList.add("expense");

		// Cria o ícone
		const icon = document.createElement("img");
		icon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
		icon.setAttribute("alt", `Ícone do tipo ${newExpense.category_name}`);

		// Cria a div com as informações do expense-info
		const expenseInfo = document.createElement("div");
		expenseInfo.classList.add("expense-info");

		// Cria o elemento strong onde fica o titulo do expense
		const strong = document.createElement("strong");
		strong.textContent = newExpense.expense;

		// Cria o span com a informação do tipo de serviço
		const span = document.createElement("span");
		span.textContent = newExpense.category_name;

		// adiciona o strong e o span dentro da
		expenseInfo.append(strong, span);

		//Adiciona o valor da despesa
		const expenseAmount = document.createElement("span");
		expenseAmount.classList.add("expense-amount");
		expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

		// Ícone de remover
		const remover = document.createElement("img");
		remover.setAttribute("src", "./img/remove.svg");
		remover.setAttribute("alt", "remover");
		remover.classList.add("remove-icon");

		// Adicionando os itens dentro da li
		li.append(icon, expenseInfo, expenseAmount, remover);

		// adiciona itens dentro da ul
		lista.append(li);
	} catch (error) {
		alert("Não foi possível atualizar a lista de despesas.");
		console.log(error);
	}
}
