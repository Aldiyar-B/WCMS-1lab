const periods = {
  replenish: {
    "6 месяцев": 20,
    "1 год": 22,
    "1.5 года": 15,
    "2 года": 10,
  },
  term: {
    "3 месяца": 20,
    "6 месяцев": 22,
    "9 месяцев": 23,
    "1 год": 24,
    "1.5 года": 18,
    "2 года": 15,
  },
};

const typeSelect = document.getElementById("type");
const periodSelect = document.getElementById("period");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

typeSelect.addEventListener("change", () => {
  periodSelect.innerHTML = '<option value="">Срок вклада</option>';

  const type = typeSelect.value;
  if (!type) return;

  Object.keys(periods[type]).forEach((period) => {
    const option = document.createElement("option");
    option.value = period;
    option.textContent = period;
    periodSelect.appendChild(option);
  });
});

document.getElementById("calc").addEventListener("click", () => {
  const type = typeSelect.value;
  const period = periodSelect.value;
  const amount = Number(amountInput.value);

  if (!type || !period || !amount) {
    result.textContent = "Пожалуйста, заполните все поля.";
    return;
  }

  const percent = periods[type][period];
  const finalAmount = amount + (amount * percent) / 100;

  result.innerHTML = `
    Вклад "<b>${type === "replenish" ? "Пополняемый" : "Срочный"}</b>" 
    на срок "<b>${period}</b>" 
    на сумму <b>${amount} руб.</b>.<br><br>
    В конце срока вы получите <b>${finalAmount} руб.</b>.
  `;
});
