(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#2847',
      missing: [
        ['Final headcount', 'catering'],
        ['Dietary list', '12 guests'],
        ['PAT certs', 'AV supplier'],
        ['Run sheet', 'v3 not signed'],
      ],
      todos: [
        { icon: '🍽', title: 'Catering brief', pill: 'Allergens', pillOut: false, sub: 'Allergen sheet incomplete, 12 guest gaps' },
        { icon: '🚐', title: 'Load-in plan', pill: 'Confirmed', pillOut: true, sub: 'Venue agreed 06:30 access for AV team' },
      ],
      waTo: 'Lucy (Bride)',
      waMsg: "Hi Lucy, quick one to lock the wedding in. Could you send the final guest count, the updated dietary list with allergens, and confirm the AV load-in time with the venue?",
    },
    {
      num: '#5193',
      missing: [
        ['Stage plot', 'AV'],
        ['Speaker bios', 'final'],
        ['Alcohol licence', 'TEN copy'],
        ['Insurance cert', 'florist'],
      ],
      todos: [
        { icon: '🎤', title: 'Run-of-show', pill: 'v4 review', pillOut: false, sub: 'Two speeches added, timings tight' },
        { icon: '🏷', title: 'Name badges', pill: 'Printed', pillOut: true, sub: '420 guests, VIP table 2 confirmed' },
      ],
      waTo: 'Marcus (Client)',
      waMsg: "Hi Marcus, to lock the corporate gala in could you send the final stage plot, all speaker bios, and a copy of the TEN alcohol licence for the venue file?",
    },
    {
      num: '#6021',
      missing: [
        ['Marquee permit', 'council'],
        ['Generator', 'fuel plan'],
        ['Catering count', 'children'],
        ['Toilet plan', 'accessible'],
      ],
      todos: [
        { icon: '⛺', title: 'Site logistics', pill: 'Walk-through', pillOut: false, sub: 'Friday recce with venue manager' },
        { icon: '🌧', title: 'Weather plan', pill: 'Reviewed', pillOut: true, sub: 'Awning + heater hire confirmed' },
      ],
      waTo: 'Hannah (Host)',
      waMsg: "Hi Hannah, to keep the garden party on track could you confirm the final children's catering count, share the council marquee permit, and let me know if you'd like accessible toilets added to the order?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on event ${c.num}?`;
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
