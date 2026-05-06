(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#DLR-2847',
      missing: [
        ['Driving licence', 'front & back'],
        ['Proof of address', '3 months'],
        ['Finance application', 'signed'],
        ['Part-ex', 'V5C scan'],
      ],
      todos: [
        { icon: '🚗', title: 'Test drive', pill: 'Confirmed', pillOut: false, sub: 'Saturday 11am, 30-min route, demo prepped' },
        { icon: '💷', title: 'Finance pre-app', pill: 'Drafted', pillOut: true, sub: 'PCP 4yr, £3K deposit, balloon flagged' },
      ],
      waTo: 'Mr Khan',
      waMsg: "Hi Mr Khan, looking forward to seeing you Saturday! Could you ping over a clear photo of your driving licence (both sides), a recent proof of address, and the V5C of your part-ex so we can have everything ready when you arrive?",
    },
    {
      num: '#DLR-3214',
      missing: [
        ['EV charger', 'home install check'],
        ['Octopus tariff', 'go EV proof'],
        ['Settlement figure', 'current PCP'],
      ],
      todos: [
        { icon: '⚡', title: 'EV demo prep', pill: 'Drafted', pillOut: false, sub: 'Range, charging, OTR pricing summary' },
        { icon: '📋', title: 'Settlement chase', pill: 'Reviewed', pillOut: true, sub: 'Current PCP balance from VWFS' },
      ],
      waTo: 'Ms Brown',
      waMsg: "Hi Ms Brown, ahead of your EV test drive could you confirm whether you have a home charger installed (or plan to), share your current Octopus tariff details if relevant, and get the settlement figure on your existing PCP from VW Finance?",
    },
    {
      num: '#DLR-4102',
      missing: [
        ['Business proof', 'VAT cert'],
        ['Director details', 'Companies House'],
        ['Fleet docs', 'insurance + accounts'],
        ['BIK calculation', 'requested'],
      ],
      todos: [
        { icon: '🏢', title: 'Business contract', pill: 'Drafted', pillOut: true, sub: 'Tier-2 hire purchase, balloon optional' },
        { icon: '📊', title: 'BIK summary', pill: 'Open', pillOut: false, sub: 'EV BIK rate vs ICE comparison' },
      ],
      waTo: 'Mr Adebayo',
      waMsg: "Hi Mr Adebayo, for your business van order we'll need your VAT certificate, the latest Companies House filing for director details, current fleet insurance schedule, and confirmation you'd like the BIK summary for the team.",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on deal ${c.num}?`;
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
