function mostrarSecao(idSecao) {
  const secoes = document.querySelectorAll('.form-container, .table-container');
  secoes.forEach(secao => secao.style.display = 'none');
  if (idSecao) {
    const secaoSelecionada = document.getElementById(idSecao);
    if (secaoSelecionada) secaoSelecionada.style.display = 'block';
  }
}

document.querySelectorAll('.menu a').forEach(botao => {
  botao.addEventListener('click', function (e) {
    e.preventDefault();
    const idSecao = this.getAttribute('href').substring(1);
    mostrarSecao(idSecao);
  });
});

window.onload = function () {
  mostrarSecao('');
  carregarDadosIniciais();
};

function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDados(chave) {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : [];
}

let pacientes = carregarDados('pacientes');
let medicos = carregarDados('medicos');
let consultas = carregarDados('consultas');
let exames = carregarDados('exames');
let pagamentos = carregarDados('pagamentos');

if (medicos.length === 0) {
  medicos = [
    { nome: "Dr. João Silva - Clínico Geral" },
    { nome: "Dra. Maria Oliveira - Pediatra" },
    { nome: "Dr. Carlos Souza - Cardiologista" },
    { nome: "Dra. Ana Martins - Dermatologista" },
    { nome: "Dr. Paulo Mendes - Ortopedista" },
    { nome: "Dra. Lúcia Santos - Odontologista" },
    { nome: "Dr. Felipe Almeida - Neurologista" },
    { nome: "Dra. Carla Ribeiro - Psicóloga" }
  ];
  salvarDados('medicos', medicos);
}

document.getElementById('form-paciente').addEventListener('submit', function (e) {
  e.preventDefault();
  const paciente = {
    nome: document.getElementById('nome-paciente').value,
    cpf: document.getElementById('cpf-paciente').value,
    dataNascimento: document.getElementById('data-nascimento-paciente').value,
    telefone: document.getElementById('telefone-paciente').value,
    email: document.getElementById('email-paciente').value
  };
  pacientes.push(paciente);
  salvarDados('pacientes', pacientes);
  alert('Paciente cadastrado com sucesso!');
  e.target.reset();
  atualizarSelects();
});

document.getElementById('form-consulta').addEventListener('submit', function (e) {
  e.preventDefault();
  const consulta = {
    paciente: document.getElementById('paciente-consulta').value,
    medico: document.getElementById('medico-consulta').value,
    data: document.getElementById('data-consulta').value,
    descricao: document.getElementById('descricao-consulta').value
  };
  consultas.push(consulta);
  salvarDados('consultas', consultas);
  alert('Consulta agendada com sucesso!');
  e.target.reset();
  atualizarTabelaConsultas();
});

document.getElementById('form-exame').addEventListener('submit', function (e) {
  e.preventDefault();
  const exame = {
    paciente: document.getElementById('paciente-exame').value,
    tipo: document.getElementById('tipo-exame').value,
    resultado: document.getElementById('resultado-exame').value
  };
  exames.push(exame);
  salvarDados('exames', exames);
  alert('Exame solicitado com sucesso!');
  e.target.reset();
  atualizarTabelaExames();
  gerarPDFExame(exame);
});

document.getElementById('form-pagamento').addEventListener('submit', function (e) {
  e.preventDefault();
  const pagamento = {
    paciente: document.getElementById('paciente-pagamento').value,
    valor: document.getElementById('valor-pagamento').value,
    tipo: document.getElementById('tipo-pagamento').value,
    data: document.getElementById('data-pagamento').value,
    status: document.getElementById('status-pagamento').value
  };
  pagamentos.push(pagamento);
  salvarDados('pagamentos', pagamentos);
  alert('Pagamento registrado com sucesso!');
  e.target.reset();
  atualizarTabelaPagamentos();
});

function atualizarSelects() {
  const pacienteSelects = document.querySelectorAll('#paciente-consulta, #paciente-exame, #paciente-pagamento');
  const medicoSelect = document.getElementById('medico-consulta');

  pacienteSelects.forEach(select => {
    select.innerHTML = '<option value="">Selecione o Paciente</option>';
    pacientes.forEach(p => {
      const option = document.createElement('option');
      option.value = p.nome;
      option.textContent = p.nome;
      select.appendChild(option);
    });
  });

  medicoSelect.innerHTML = '<option value="">Selecione o Médico</option>';
  medicos.forEach(m => {
    const option = document.createElement('option');
    option.value = m.nome;
    option.textContent = m.nome;
    medicoSelect.appendChild(option);
  });
}

function atualizarTabelaConsultas() {
  const tabela = document.querySelector('#tabela-consultas tbody');
  tabela.innerHTML = '';
  consultas.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.paciente}</td>
      <td>${c.medico}</td>
      <td>${c.data}</td>
      <td>${c.descricao}</td>
      <td>
        <button onclick="editarConsulta(${i})" style="background:#108fd0;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Editar</button>
        <button onclick="excluirConsulta(${i})" style="background:#d91481;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Excluir</button>
      </td>`;
    tabela.appendChild(tr);
  });
}

function excluirConsulta(index) {
  if (confirm('Deseja realmente excluir esta consulta?')) {
    consultas.splice(index, 1);
    salvarDados('consultas', consultas);
    atualizarTabelaConsultas();
  }
}

function editarConsulta(index) {
  const c = consultas[index];
  const paciente = prompt('Editar paciente:', c.paciente);
  const medico = prompt('Editar médico:', c.medico);
  const data = prompt('Editar data:', c.data);
  const descricao = prompt('Editar motivo:', c.descricao);
  if (paciente && medico && data && descricao) {
    consultas[index] = { paciente, medico, data, descricao };
    salvarDados('consultas', consultas);
    atualizarTabelaConsultas();
  }
}

function atualizarTabelaPagamentos() {
  let tabela = document.querySelector('#tabela-pagamentos');
  if (!tabela) {
    tabela = document.createElement('table');
    tabela.id = 'tabela-pagamentos';
    tabela.style.width = '100%';
    tabela.style.borderCollapse = 'collapse';
    tabela.innerHTML = `
      <thead>
        <tr style="background:#043464; color:white;">
          <th style="padding:8px; border:1px solid #ccc;">Paciente</th>
          <th style="padding:8px; border:1px solid #ccc;">Valor</th>
          <th style="padding:8px; border:1px solid #ccc;">Tipo</th>
          <th style="padding:8px; border:1px solid #ccc;">Data</th>
          <th style="padding:8px; border:1px solid #ccc;">Status</th>
          <th style="padding:8px; border:1px solid #ccc;">Ações</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    document.getElementById('pagamentos').appendChild(tabela);
  }

  const tbody = tabela.querySelector('tbody');
  tbody.innerHTML = '';

  pagamentos.forEach((p, i) => {
    const tr = document.createElement('tr');
    let cor = '';
    if (p.status === 'Concluído') cor = 'background-color:#d4edda';
    if (p.status === 'Pendente') cor = 'background-color:#fff3cd';
    if (p.status === 'Cancelado') cor = 'background-color:#f8d7da';
    tr.style = cor;
    tr.innerHTML = `
      <td>${p.paciente}</td>
      <td>${p.valor}</td>
      <td>${p.tipo}</td>
      <td>${p.data}</td>
      <td>${p.status}</td>
      <td>
        <button onclick="gerarPDFPagamento(${i})" style="background:#108fd0;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Recibo</button>
        <button onclick="excluirPagamento(${i})" style="background:#d91481;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function atualizarTabelaExames() {
  let tabela = document.querySelector('#tabela-exames');
  if (!tabela) {
    tabela = document.createElement('table');
    tabela.id = 'tabela-exames';
    tabela.style.width = '100%';
    tabela.style.borderCollapse = 'collapse';
    tabela.innerHTML = `
      <thead>
        <tr style="background:#043464; color:white;">
          <th style="padding:8px; border:1px solid #ccc;">Paciente</th>
          <th style="padding:8px; border:1px solid #ccc;">Tipo de Exame</th>
          <th style="padding:8px; border:1px solid #ccc;">Resultado</th>
          <th style="padding:8px; border:1px solid #ccc;">Ações</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    document.getElementById('exames').appendChild(tabela);
  }

  const tbody = tabela.querySelector('tbody');
  tbody.innerHTML = '';

  exames.forEach((e, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.paciente}</td>
      <td>${e.tipo}</td>
      <td>${e.resultado}</td>
      <td>
        <button onclick="gerarPDFExame(${i})" style="background:#108fd0;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">PDF</button>
        <button onclick="excluirExame(${i})" style="background:#d91481;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function gerarPDFExame(index) {
  const { jsPDF } = window.jspdf;
  const e = exames[index];
  const doc = new jsPDF();
  doc.text('Solicitação de Exame', 105, 10, { align: 'center' });
  doc.text(`Paciente: ${e.paciente}`, 10, 20);
  doc.text(`Tipo de Exame: ${e.tipo}`, 10, 30);
  doc.text(`Resultado: ${e.resultado}`, 10, 40);
  doc.save(`exame-${e.paciente}.pdf`);
}

function gerarPDFPagamento(index) {
  const { jsPDF } = window.jspdf;
  const p = pagamentos[index];
  const doc = new jsPDF();
  doc.text('Recibo de Pagamento', 105, 10, { align: 'center' });
  doc.text(`Paciente: ${p.paciente}`, 10, 20);
  doc.text(`Valor: ${p.valor}`, 10, 30);
  doc.text(`Tipo: ${p.tipo}`, 10, 40);
  doc.text(`Data: ${p.data}`, 10, 50);
  doc.text(`Status: ${p.status}`, 10, 60);
  doc.save(`pagamento-${p.paciente}.pdf`);
}

function excluirPagamento(index) {
  if (confirm('Deseja realmente excluir este pagamento?')) {
    pagamentos.splice(index, 1);
    salvarDados('pagamentos', pagamentos);
    atualizarTabelaPagamentos();
  }
}

function excluirExame(index) {
  if (confirm('Deseja realmente excluir este exame?')) {
    exames.splice(index, 1);
    salvarDados('exames', exames);
    atualizarTabelaExames();
  }
}

function carregarDadosIniciais() {
  atualizarSelects();
  atualizarTabelaConsultas();
  atualizarTabelaPagamentos();
  atualizarTabelaExames();
}
