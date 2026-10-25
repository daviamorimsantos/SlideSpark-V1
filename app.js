(() => {
  const $ = (id) => document.getElementById(id);
  const form = $('orderForm');
  const WHATSAPP_NUMBER = '5577999702260'; // DDI 55 + DDD 77 + número informado pelo responsável
  const money = (n) => `R$ ${n.toFixed(2).replace('.', ',')}`;
  const checked = (name) => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value);
  const val = (id) => $(id).value.trim();

  function getData() {
    const features = checked('features');
    const depth = checked('depth')[0] || 'Essencial';
    const visual = checked('visual')[0] || 'Moderno e imersivo';
    const objective = checked('objective')[0] || 'Apresentar em sala de aula';
    const workType = checked('workType')[0] || 'Individual';
    const groupMembers = val('groupMembers');
    const pages = val('pages');
    const deadline = val('deadline');
    let price = 20;
    if (pages.startsWith('Padrão')) price += 4;
    if (pages.startsWith('Amplo')) price += 8;
    if (depth === 'Completo') price += 4;
    if (depth === 'Aprofundado') price += 8;
    if (features.includes('Animações suaves')) price += 2;
    if (features.includes('Menu de navegação interativo')) price += 2;
    if (features.includes('Gráficos e diagramas')) price += 2;
    if (visual === 'Cinematográfico') price += 3;
    if (deadline === 'Até 24 horas') price += 4;
    else if (deadline === '2 a 3 dias') price += 2;
    price = Math.min(45, price);
    return { topic: val('topic'), subject: val('subject') || 'Não informada', grade: val('grade'), workType, groupMembers: groupMembers || 'Não se aplica', objective, depth, visual, features, deadline, pages, details: val('details') || 'Nenhuma orientação extra informada', name: val('name') || 'Não informado', price };
  }

  function render() {
    const d = getData();
    const groupBlock = $('groupMembersBlock');
    const groupField = $('groupMembers');
    const isGroup = d.workType === 'Em grupo';
    groupBlock.hidden = !isGroup;
    groupField.required = isGroup;
    $('quotePrice').textContent = money(d.price);
    $('quoteDescription').textContent = d.pages.startsWith('Amplo') || d.depth === 'Aprofundado' ? 'Projeto mais detalhado, com conteúdo aprofundado.' : d.depth === 'Completo' ? 'Projeto completo com explicações e exemplos.' : 'Projeto personalizado com conteúdo essencial.';
    const topicFilled = d.topic.length > 0;
    const total = 5;
    const filled = [topicFilled, val('subject').length > 0, val('details').length > 0, val('name').length > 0, checked('features').length > 0].filter(Boolean).length;
    const pct = Math.round(filled / total * 100);
    $('completionText').textContent = `${pct}% preenchido`;
    $('completionBar').style.width = `${pct}%`;
    $('orderSummary').innerHTML = topicFilled ? `
      <div class="summary-row"><span>Tema</span><b>${escapeHtml(d.topic)}</b></div>
      <div class="summary-row"><span>Nível / matéria</span><b>${escapeHtml(d.grade)} · ${escapeHtml(d.subject)}</b></div>
      <div class="summary-row"><span>Modalidade</span><b>${escapeHtml(d.workType)}</b></div>
      ${d.workType === 'Em grupo' ? `<div class="summary-row"><span>Participantes</span><b>${escapeHtml(d.groupMembers || 'Preencha os nomes')}</b></div>` : ''}
      <div class="summary-row"><span>Objetivo</span><b>${escapeHtml(d.objective)}</b></div>
      <div class="summary-row"><span>Conteúdo / tamanho</span><b>${escapeHtml(d.depth)} · ${escapeHtml(d.pages)}</b></div>
      <div class="summary-row"><span>Estilo visual</span><b>${escapeHtml(d.visual)}</b></div>
      <div class="summary-row"><span>Recursos</span><b>${escapeHtml(d.features.length ? d.features.join(', ') : 'A definir')}</b></div>
      <div class="summary-row"><span>Prazo desejado</span><b>${escapeHtml(d.deadline)}</b></div>
    ` : 'Preencha o tema para começar a montar seu resumo.';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const d = getData();
    const report = [
      '📋 *NOVO PEDIDO — NOTAPRONTA*',
      '',
      `*Código do pedido:* NP-${new Date().toISOString().slice(0,10).replaceAll('-', '')}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,
      `*Nome:* ${d.name}`,
      `*Tema:* ${d.topic}`,
      `*Matéria:* ${d.subject}`,
      `*Nível:* ${d.grade}`,
      `*Modalidade:* ${d.workType}`,
      ...(d.workType === 'Em grupo' ? [`*Participantes do grupo:* ${d.groupMembers}`] : []),
      `*Objetivo:* ${d.objective}`,
      `*Profundidade:* ${d.depth}`,
      `*Estilo visual:* ${d.visual}`,
      `*Tamanho:* ${d.pages}`,
      `*Recursos:* ${d.features.length ? d.features.join(', ') : 'A definir'}`,
      `*Prazo desejado:* ${d.deadline}`,
      `*Orientações extras:* ${d.details}`,
      '',
      `💰 *Orçamento estimado: ${money(d.price)}*`,
      '',
      '*Próxima etapa:* confirmar detalhes, disponibilidade e pagamento diretamente no privado.',
      'O orçamento é estimado e pode ser ajustado após análise do pedido.'
    ].join('\n');
    $('formStatus').textContent = 'Abrindo o WhatsApp com seu relatório. Confira a conversa e toque em Enviar.';
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(report)}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
  render();
})();
