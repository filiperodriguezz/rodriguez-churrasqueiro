'use strict';
const form = document.querySelector('#quote-form');
const dateField = form.elements.data;
const today = new Date();
const localToday = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
dateField.min = localToday;
document.querySelector('#year').textContent = today.getFullYear();
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { form.elements.servico.value = link.dataset.service; }));
form.addEventListener('submit', event => {
 for (const name of ['nome','local','email','telefone']) {
  const field = form.elements[name];
  field.value = field.value.trim();
 }
 if (!form.reportValidity()) {
  event.preventDefault();
  return;
 }
 document.querySelector('#form-status').textContent = 'Encaminhando seu pedido. Conclua a verificação de envio, se solicitada.';
});
