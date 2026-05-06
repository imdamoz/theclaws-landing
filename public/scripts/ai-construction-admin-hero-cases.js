(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#2847',
      missing: [
        ['RFI 023', 'architect reply'],
        ['Submittal', 'concrete mix'],
        ['RAMS', 'MEP subbie'],
        ['ITR', 'Block B fire stop'],
      ],
      todos: [
        { icon: '📐', title: 'Drawing register', pill: 'Rev clash', pillOut: false, sub: 'Issued L02 vs current L03 on plant room' },
        { icon: '📝', title: 'Variation log', pill: 'Reviewed', pillOut: true, sub: 'VO-014 added with cost & programme impact' },
      ],
      waTo: 'James (MEP)',
      waMsg: "Hi James, quick one to keep us on programme. Could you send the architect's reply on RFI 023, the concrete mix submittal, and your latest RAMS for the MEP package?",
    },
    {
      num: '#5193',
      missing: [
        ['Steel test certs', 'frame'],
        ['Lifting plan', 'method statement'],
        ['F10', 'HSE notification'],
        ['Compaction', 'sub-base record'],
      ],
      todos: [
        { icon: '⏳', title: 'Programme', pill: '5-day slip', pillOut: false, sub: 'Steel delivery vs concrete pour clash' },
        { icon: '🔧', title: 'NCR closeout', pill: 'In review', pillOut: true, sub: 'Weld inspection NCRs 02 and 03' },
      ],
      waTo: 'Sara (Steel)',
      waMsg: "Hi Sara, we need to keep the steel sequence on track. Could you send the mill test certs for this delivery, your updated lifting method statement, and confirm F10 is in for the new section?",
    },
    {
      num: '#6021',
      missing: [
        ['Fire stopping', 'Block B SOR'],
        ['DPC verification', 'levels survey'],
        ['Sample panel', 'cladding sign-off'],
        ['As-built', 'MEP final'],
      ],
      todos: [
        { icon: '✅', title: 'ITP register', pill: 'Week 12', pillOut: false, sub: 'Pre-handover inspection cycle starting' },
        { icon: '📋', title: 'Snag closeout', pill: 'Plot 4', pillOut: true, sub: 'Last 6 items signed off by client rep' },
      ],
      waTo: 'Marcus (M&E)',
      waMsg: "Hi Marcus, to lock down handover for Block B could you send the fire-stopping schedule of remedials, the cladding sample panel sign-off, and your as-built MEP drawings?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on project ${c.num}?`;
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
