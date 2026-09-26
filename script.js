'use strict';
const form = document.querySelector('#quote-form');
const dateField = form.elements.data;
const today = new Date();
const localToday = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
dateField.min = localToday;
document.querySelector('#year').textContent = today.getFullYear();
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { form.elements.servico.value = link.dataset.service; }));
function buildMessage(values) {
 const date = values.data.split('-').reverse().join('/');
 return ['Olá, Rafael! Gostaria de um orçamento para um churrasco.', '', `Nome: ${values.nome.trim()}`, `Data: ${date}`, `Convidados: ${values.convidados}`, `Local: ${values.local.trim()}`, `Serviço: ${values.servico}`, values.mensagem.trim() ? `Detalhes: ${values.mensagem.trim()}` : ''].filter((line,index) => line || index===1).join('\n');
}
form.addEventListener('submit', event => {
 event.preventDefault();
 for (const name of ['nome','local']) {const field=form.elements[name];field.value=field.value.trim();}
 if (!form.reportValidity()) return;
 const values=Object.fromEntries(new FormData(form));
 const url='https://wa.me/5511992382698?text='+encodeURIComponent(buildMessage(values));
 document.querySelector('#form-status').textContent='Seu pedido está pronto. Finalize o envio no WhatsApp.';
 window.location.assign(url);
});
