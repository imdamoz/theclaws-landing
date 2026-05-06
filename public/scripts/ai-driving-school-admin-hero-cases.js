(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#DRV-2847',
      missing: [
        ['Provisional licence', 'photo'],
        ['Block 3 payment', '10 lessons'],
        ['Theory pass cert', 'scan'],
        ['Eyesight check', '20m plate'],
      ],
      todos: [
        { icon: '📅', title: 'Test booking', pill: 'Confirmed', pillOut: false, sub: 'Practical test — Loughborough centre, 4 weeks out' },
        { icon: '📋', title: 'Lesson plan', pill: 'Reviewed', pillOut: true, sub: '2 mocks + dual carriageway focus before test' },
      ],
      waTo: 'Sam',
      waMsg: "Hi Sam, smashing progress on roundabouts last week! To get you booked for your practical and lock in block 3, could you send a photo of your provisional, your theory pass certificate, and ping the £350 block payment via the link?",
    },
    {
      num: '#DRV-3214',
      missing: [
        ['Mock test 2', 'scheduled'],
        ['Parallel park', 're-attempt needed'],
        ['Pre-test pep talk', 'booked'],
      ],
      todos: [
        { icon: '🚗', title: 'Pre-test plan', pill: 'Drafted', pillOut: false, sub: '2-hour test-warmup, hire car at centre' },
        { icon: '⚠️', title: 'Weak-area focus', pill: 'Reviewed', pillOut: true, sub: 'Parallel park + meeting traffic priorities' },
      ],
      waTo: 'Maya',
      waMsg: "Hi Maya, 7 days till your test! Let's lock in a 2-hour pre-test warm-up the morning of (with hire car) and a focused parallel-park session this Wednesday. Rest well, and ping any nerves my way before the day.",
    },
    {
      num: '#DRV-4102',
      missing: [
        ['Parent update', 'block 4 progress'],
        ['Intensive course', 'option pricing'],
        ['Provisional renewal', 'expires Jan'],
      ],
      todos: [
        { icon: '👨‍👩‍👧', title: 'Parent summary', pill: 'Drafted', pillOut: false, sub: 'Block 4 progress, est. 8 lessons to test-ready' },
        { icon: '🚀', title: 'Intensive option', pill: 'Drafted', pillOut: true, sub: '20-hour course over 2 weeks, summer break' },
      ],
      waTo: 'Mr Adebayo · Tomi',
      waMsg: "Hi Mr Adebayo, quick update on Tomi! She's about 8 lessons from test-ready. We've drafted two options below — continue weekly or do an intensive 20-hour course over her summer break. Also a heads-up her provisional needs renewing before January.",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on pupil ${c.num}?`;
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
