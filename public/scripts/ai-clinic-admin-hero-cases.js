(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#2847',
      missing: [
        ['Intake form', '5 fields'],
        ['Lab result', 'awaiting GP review'],
        ['Allergy update', 'not in record'],
        ['Consent form', 'not signed'],
      ],
      todos: [
        { icon: '💊', title: 'Medication check', pill: 'Interaction', pillOut: false, sub: 'Ramipril vs ibuprofen — flagged for review' },
        { icon: '📅', title: 'Follow-up', pill: 'Booked', pillOut: true, sub: '2-week review with practice nurse' },
      ],
      waTo: 'Sarah',
      waMsg: "Hi Sarah, hope you're feeling well. To prepare for your annual review, could you complete the missing items on your intake form, confirm your current allergies, and book a follow-up at your earliest convenience?",
    },
    {
      num: '#5193',
      missing: [
        ['HbA1c', 'overdue 4 months'],
        ['Foot check', 'annual due'],
        ['BP reading', 'home log'],
        ['Smoking status', 'not updated'],
      ],
      todos: [
        { icon: '🩸', title: 'Diabetic recall', pill: 'Overdue', pillOut: false, sub: 'HbA1c due, last reading 6 months ago' },
        { icon: '👁', title: 'Retinal screening', pill: 'Booked', pillOut: true, sub: 'NHS pathway referral confirmed' },
      ],
      waTo: 'Mr Patel',
      waMsg: "Hi Mr Patel, you're due for your annual diabetic review. Could you book a blood test at the surgery this week, send through a week of home BP readings, and let us know a good time for your foot check?",
    },
    {
      num: '#6021',
      missing: [
        ['Pre-op questionnaire', 'incomplete'],
        ['Anticoagulant', 'stop date unclear'],
        ['Recent ECG', 'not on file'],
        ['Anaesthetic history', 'previous reaction'],
      ],
      todos: [
        { icon: '🏥', title: 'Pre-op review', pill: 'Urgent', pillOut: false, sub: 'Surgery in 12 days, gaps need clearing' },
        { icon: '📋', title: 'Surgeon letter', pill: 'Drafted', pillOut: true, sub: 'Onward summary ready for review' },
      ],
      waTo: 'Mrs Okafor',
      waMsg: "Hi Mrs Okafor, with your surgery coming up could you complete the pre-op questionnaire, confirm when you stopped your anticoagulants, and pop in for a quick ECG this week so the team has everything ready?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on patient ${c.num}?`;
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
