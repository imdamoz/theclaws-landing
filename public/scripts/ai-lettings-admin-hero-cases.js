(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#LET-2847',
      missing: [
        ['Right-to-rent ID', 'share code'],
        ['Employer reference', 'pending'],
        ['Deposit', '5 weeks rent'],
        ['Guarantor form', 'signed'],
      ],
      todos: [
        { icon: '📜', title: 'AST', pill: 'Drafted', pillOut: false, sub: '12-month, break clause at 6, joint & several' },
        { icon: '🏠', title: 'Viewing', pill: 'Confirmed', pillOut: true, sub: 'Saturday 2pm, follow-up viewing booked' },
      ],
      waTo: 'Ms Patel',
      waMsg: "Hi Ms Patel, lovely to confirm your offer's accepted! To get the AST signed and the move-in booked could you send your right-to-rent share code, ask your employer for a quick reference to the address below, and we'll send the deposit and guarantor links shortly?",
    },
    {
      num: '#LET-3214',
      missing: [
        ['Student status', 'enrolment letter'],
        ['UK guarantor', 'parents'],
        ['HMO licence', 'displayed'],
      ],
      todos: [
        { icon: '🎓', title: 'Group AST', pill: 'Drafted', pillOut: false, sub: '4-bed HMO, 11-month term, joint & several' },
        { icon: '📋', title: 'HMO checklist', pill: 'Reviewed', pillOut: true, sub: 'Fire doors, mains-wired alarms, EICR' },
      ],
      waTo: 'Ms Brown',
      waMsg: "Hi Ms Brown, lovely to confirm the 4-bed for the group! Could each housemate send their enrolment letter for the next academic year, and ask their UK-based parent or guardian to complete the guarantor form via the link we'll send next?",
    },
    {
      num: '#LET-4102',
      missing: [
        ['Maintenance photo', 'leak under sink'],
        ['Contractor quote', 'plumber'],
        ['Tenant access', 'Saturday window'],
        ['Section 11 reminder', 'landlord obligations'],
      ],
      todos: [
        { icon: '🔧', title: 'Contractor instruction', pill: 'Drafted', pillOut: true, sub: 'Approved plumber, £180 emergency callout' },
        { icon: '📞', title: 'Landlord update', pill: 'Open', pillOut: false, sub: 'Cost approval before scheduling repair' },
      ],
      waTo: 'Mr Adebayo',
      waMsg: "Hi Mr Adebayo, thanks for sending the photo of the leak under the sink. We've contacted our approved plumber and would like to attend Saturday — could you confirm a time window between 9am and 4pm and we'll get this fixed straight away?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on tenancy ${c.num}?`;
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
