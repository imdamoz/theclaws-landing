(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#ACC-2847',
      missing: [
        ['Bank statement', 'Q2'],
        ['P60', '2024-25'],
        ['Dividend voucher', 'interim'],
        ['Vehicle mileage', 'log'],
      ],
      todos: [
        { icon: '📊', title: 'VAT return', pill: 'Drafted', pillOut: false, sub: 'Q2 figures reconciled, awaiting director sign-off' },
        { icon: '💬', title: 'Client query', pill: 'Reviewed', pillOut: true, sub: "Director's loan threshold flagged early" },
      ],
      waTo: 'Mr Patel',
      waMsg: "Hi Mr Patel, getting your year-end ready. Could you send the Q2 bank statement, your 2024-25 P60, the interim dividend voucher, and the latest mileage log so we can finalise the figures?",
    },
    {
      num: '#ACC-3214',
      missing: [
        ['Self Assessment', 'income sources'],
        ['Property income', 'rental statement'],
        ['Pension contribution', 'cert'],
      ],
      todos: [
        { icon: '🧾', title: 'SA100 draft', pill: 'Pending', pillOut: false, sub: 'Higher-rate band crossed, payments-on-account note' },
        { icon: '🏠', title: 'Property pages', pill: 'Drafted', pillOut: true, sub: 'Furnished holiday let — separate schedule' },
      ],
      waTo: 'Ms Brown',
      waMsg: "Hi Ms Brown, for your SA we still need the rental income statement for the FHL property, your latest pension contribution certificate, and confirmation of any other untaxed income for 2024-25.",
    },
    {
      num: '#ACC-4102',
      missing: [
        ['Companies House', 'PSC update'],
        ['Confirmation statement', 'due'],
        ['Director ID', 'verification'],
        ['Dormant declaration', 'signed'],
      ],
      todos: [
        { icon: '🏢', title: 'Filing pack', pill: 'Drafted', pillOut: true, sub: 'FRS 105 micro accounts + CS01' },
        { icon: '⚠️', title: 'Late-filing risk', pill: 'Open', pillOut: false, sub: 'CS01 due in 9 days, escalation drafted' },
      ],
      waTo: 'Mr Adebayo',
      waMsg: "Hi Mr Adebayo, your Companies House confirmation statement is due in 9 days. Could you sign the dormant declaration, confirm the PSC details haven't changed, and complete the new director ID verification with Companies House this week?",
    },
  ];

  const stage = document.querySelector('.hero-stage');
  if (!stage) return;

  const bubble = stage.querySelector('.sbubble');
  const missingCard = stage.querySelector('.fcard-alert');
  const missingList = missingCard?.querySelector('.chip-list');
  const missingPill = missingCard?.querySelector('.fc-head .pill');
  const todoCard = stage.querySelector('.fcard-todo');
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on engagement ${c.num}?`;
    missingPill.textContent = String(c.missing.length);
    missingList.innerHTML = renderMissing(c.missing);
    const todoHead = todoCard.querySelector('.fc-head');
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
