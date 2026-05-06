(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#ABL-2847',
      missing: [
        ['Photo ID', 'client'],
        ['Source of funds', 'letter'],
        ['Signed CFA', 'page 3'],
        ['Witness statement', 'missing'],
      ],
      todos: [
        { icon: '⚖️', title: 'Conflict check', pill: 'Pending', pillOut: false, sub: 'Cross-reference against active matters' },
        { icon: '📝', title: 'Client care letter', pill: 'Drafted', pillOut: true, sub: 'Fee estimate & CFA terms attached' },
      ],
      waTo: 'Mr Adebayo',
      waMsg: "Hi Mr Adebayo, quick one to get your matter moving. Could you send a clear photo of your passport, a short letter explaining where the deposit funds came from, and the signed CFA page 3?",
    },
    {
      num: '#ABL-3214',
      missing: [
        ["Director's ID", 'certified'],
        ['Companies House', 'confirmation'],
        ['Beneficial owner', 'declaration'],
      ],
      todos: [
        { icon: '🏢', title: 'KYB on entity', pill: 'Pending', pillOut: false, sub: 'Sanctions & PSC register check' },
        { icon: '📑', title: 'Engagement letter', pill: 'Drafted', pillOut: true, sub: 'Scope & cap reflected in retainer' },
      ],
      waTo: 'Ms Patel',
      waMsg: "Hi Ms Patel, to get your acquisition matter moving could you send certified ID for each director, the latest Companies House confirmation statement, and the beneficial owner declaration?",
    },
    {
      num: '#ABL-4102',
      missing: [
        ['Form E', 'completed'],
        ['Decree absolute', 'scan'],
        ['Asset schedule', 'updated'],
        ['Children statement', 'welfare'],
      ],
      todos: [
        { icon: '🔒', title: 'Without prejudice flag', pill: 'Noted', pillOut: true, sub: 'WP correspondence ringfenced' },
        { icon: '💷', title: 'Costs estimate', pill: 'Open', pillOut: false, sub: 'Stage 1 financial remedy update' },
      ],
      waTo: 'Mr Okafor',
      waMsg: "Hi Mr Okafor, almost there on your matter. Could you send your completed Form E, an updated asset schedule, the children's welfare statement, and a clear scan of the decree absolute?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on matter ${c.num}?`;
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
