(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#2847',
      missing: [
        ['Source of funds', 'buyer'],
        ['Photo ID', 'vendor'],
        ['AML risk note', 'high value'],
        ['Memo of Sale', 'not sent'],
      ],
      todos: [
        { icon: '🔍', title: 'AML check', pill: 'High value', pillOut: false, sub: 'Source of funds unclear, PEP scan' },
        { icon: '📧', title: 'Memo of Sale', pill: 'Drafted', pillOut: true, sub: 'Solicitor pack ready for review' },
      ],
      waTo: 'Mr Patel',
      waMsg: "Hi Mr Patel, quick one to keep the deal moving. Could you send a clear photo ID, your latest bank statement showing the deposit, and a short note explaining where the funds came from?",
    },
    {
      num: '#5193',
      missing: [
        ['Proof of address', 'buyer'],
        ['Residency status', 'visa scan'],
        ['Source of wealth', 'overseas'],
        ['Bank reference', 'jurisdiction'],
      ],
      todos: [
        { icon: '🌍', title: 'Enhanced AML', pill: 'Overseas', pillOut: false, sub: 'High-risk jurisdiction transfer trail' },
        { icon: '📝', title: 'Vendor disclosure', pill: 'Reviewed', pillOut: true, sub: 'EPC and tenure confirmed' },
      ],
      waTo: 'Ms Chen',
      waMsg: "Hi Ms Chen, almost there on your purchase. Could you send a recent utility bill, a copy of your visa, and a bank reference confirming the deposit transfer? It will help us clear AML and move to memo.",
    },
    {
      num: '#6021',
      missing: [
        ['Gifted deposit letter', 'parents'],
        ['Buy-to-let consent', 'lender'],
        ['Tenancy schedule', 'last 12mo'],
        ['Company KYC', 'SPV directors'],
      ],
      todos: [
        { icon: '🏢', title: 'SPV ownership', pill: 'Open', pillOut: false, sub: 'Beneficial owners cross-check' },
        { icon: '🔗', title: 'Chain update', pill: 'Noted', pillOut: true, sub: 'Vendor solicitor instructed' },
      ],
      waTo: 'Mr Okafor',
      waMsg: "Hi Mr Okafor, to keep your buy-to-let on track could you send a signed gifted-deposit letter from your parents, the SPV's KYC pack for both directors, and the last 12 months of tenancy schedules?",
    },
  ];

  const stage = document.querySelector('.hero-stage');
  if (!stage) return;

  const bubble = stage.querySelector('.sbubble');
  const missingCard = stage.querySelector('.fcard-alert');
  const missingList = missingCard?.querySelector('.chip-list');
  const missingPill = missingCard?.querySelector('.fc-head .pill');
  const todoCard = stage.querySelector('.fcard-todo');
  const todoPill = todoCard?.querySelector('.fc-head .pill.lime');
  const waCard = stage.querySelector('.fcard-wa');
  const waMsg = waCard?.querySelector('.wa-msg');
  const waTo = waCard?.querySelector('.wa-meta span:first-child');

  if (!bubble || !missingList || !missingPill || !todoCard || !waMsg || !waTo) return;

  const rotators = [bubble, missingCard, todoCard, waCard];
  rotators.forEach(el => el.classList.add('is-rotatable'));

  const renderMissing = (items) => items
    .map(([label, detail]) => `<div class="chip-item">${docIcon}<span><b>${label}</b> · ${detail}</span></div>`)
    .join('');

  const renderTodos = (todos) => todos
    .map(t => `
      <div class="todo-i">
        <div class="ti-head">${t.icon} ${t.title}<span class="ti-pill${t.pillOut ? ' out' : ''}">${t.pill}</span></div>
        <div class="ti-sub">${t.sub}</div>
      </div>
    `).join('');

  const applyCase = (c) => {
    bubble.innerHTML = `<span class="spark"></span> What needs attention on deal ${c.num}?`;
    missingPill.textContent = String(c.missing.length);
    missingList.innerHTML = renderMissing(c.missing);
    const todoHead = todoCard.querySelector('.fc-head');
    if (todoPill) todoPill.textContent = `${c.todos.length} ITEMS`;
    todoCard.innerHTML = '';
    todoCard.appendChild(todoHead);
    todoCard.insertAdjacentHTML('beforeend', renderTodos(c.todos));
    waMsg.textContent = c.waMsg;
    waTo.textContent = `To: ${c.waTo}`;
  };

  let i = 0;
  const step = () => {
    rotators.forEach(el => el.classList.add('is-rotating'));
    setTimeout(() => {
      i = (i + 1) % cases.length;
      applyCase(cases[i]);
      rotators.forEach(el => el.classList.remove('is-rotating'));
    }, 320);
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    setInterval(step, 6000);
  }
})();
