(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#ROL-2847',
      missing: [
        ['Right-to-work', 'share code'],
        ['References', '2 needed'],
        ['Salary expectation', 'current vs target'],
        ['Notice period', 'confirm'],
      ],
      todos: [
        { icon: '📋', title: 'Shortlist', pill: 'Drafted', pillOut: false, sub: '5 candidates ranked, top 3 highlighted with rationale' },
        { icon: '📅', title: 'Interview slot', pill: 'Booked', pillOut: true, sub: 'Tuesday 2pm, 45-min Teams call with hiring manager' },
      ],
      waTo: 'Ms Lawal',
      waMsg: "Hi Ms Lawal, great to chat earlier! To get you in front of the client could you share your right-to-work share code, two professional references (one current manager), confirm your notice period, and your current vs target salary?",
    },
    {
      num: '#ROL-3214',
      missing: [
        ['IR35 status', 'inside / outside'],
        ['Day rate', 'confirmed'],
        ['Availability', 'start date'],
      ],
      todos: [
        { icon: '📊', title: 'Contract pack', pill: 'Drafted', pillOut: false, sub: 'CEST result attached, SDS issued' },
        { icon: '⏱️', title: 'Timesheet portal', pill: 'Reviewed', pillOut: true, sub: 'Account created, weekly sign-off enabled' },
      ],
      waTo: 'Mr Brown',
      waMsg: "Hi Mr Brown, to lock in the contract for the 6-month engagement could you confirm your IR35 status determination, the day rate we discussed, and your earliest available start? We'll send the SDS and timesheet portal link straight after.",
    },
    {
      num: '#ROL-4102',
      missing: [
        ['DBS check', 'enhanced — required'],
        ['Qualifications', 'cert copies'],
        ['Right-to-work', 'visa expiry'],
        ['References', 'last 5 years'],
      ],
      todos: [
        { icon: '🛡️', title: 'Enhanced DBS', pill: 'Submitted', pillOut: true, sub: 'Health-sector role, vulnerable adults' },
        { icon: '📚', title: 'Reference window', pill: 'Open', pillOut: false, sub: 'Continuous 5-year history needed' },
      ],
      waTo: 'Ms Adebayo',
      waMsg: "Hi Ms Adebayo, for the healthcare role we need to complete enhanced DBS, copies of your qualification certificates, your visa expiry date and references covering the last 5 years (continuous). Could you start with the cert copies and references this week?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on role ${c.num}?`;
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
