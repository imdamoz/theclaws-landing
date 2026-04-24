(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#2847',
      missing: [
        ['Payslip', 'March'],
        ['Bank statement', 'p.4'],
        ['Deposit source', 'explanation'],
        ['Credit file', 'missing'],
      ],
      todos: [
        { icon: '🗂', title: 'Credit File', pill: 'Undisclosed', pillOut: false, sub: 'Hard search, undisclosed finance' },
        { icon: '📝', title: 'Suitability Note', pill: 'Reviewed', pillOut: true, sub: 'Declined CI cover rationale added' },
      ],
      waTo: 'Mr Smith',
      waMsg: "Hi Mr Smith, quick one to get your file submitted. Could you send me your March payslip, page 4 of your bank statement, and a short note explaining where the deposit came from?",
    },
    {
      num: '#3214',
      missing: [
        ['P60', '2024'],
        ['SA302', 'last 2 years'],
        ['Accountant letter', 'income'],
      ],
      todos: [
        { icon: '📊', title: 'Income Evidence', pill: 'Pending', pillOut: false, sub: 'Day rate vs LTD split needed' },
        { icon: '🧮', title: 'Affordability', pill: 'Noted', pillOut: true, sub: 'Child benefit factored in' },
      ],
      waTo: 'Ms Patel',
      waMsg: "Hi Ms Patel, to finalise your application could you send your 2024 P60, your last two SA302s, and a short letter from your accountant confirming your income?",
    },
    {
      num: '#4102',
      missing: [
        ['Gifted deposit letter', 'parents'],
        ['ID', 'BRP scan'],
        ['Bank statements', '3 months'],
        ['Rental projection', 'ARLA'],
      ],
      todos: [
        { icon: '💷', title: 'Source of Funds', pill: 'Noted', pillOut: true, sub: 'Parental gift letter templated' },
        { icon: '🛂', title: 'Residency Check', pill: 'Open', pillOut: false, sub: 'Tier 2 expiry cross-check' },
      ],
      waTo: 'Mr Okafor',
      waMsg: "Hi Mr Okafor, almost there on your case. Could you send a signed gifted deposit letter from your parents, a scan of your BRP, the last 3 months of bank statements, and your ARLA rental projection?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on case ${c.num}?`;
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
