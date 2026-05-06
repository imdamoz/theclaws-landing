(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#JK-2847',
      missing: [
        ['Site photos', 'boiler & flue'],
        ['Access details', 'parking, key'],
        ['Deposit', '25% materials'],
        ['Parts list', 'sign-off'],
      ],
      todos: [
        { icon: '🔧', title: 'Callout sheet', pill: 'Drafted', pillOut: false, sub: 'Combi swap, 2 rads, 1 day on site' },
        { icon: '💷', title: 'Quote pricing', pill: 'Reviewed', pillOut: true, sub: 'Day rate + parts + Gas Safe cert added' },
      ],
      waTo: 'Mr Singh',
      waMsg: "Hi Mr Singh, cheers for the call. Could you ping over a couple of photos of the boiler and flue, confirm parking access, and the 25% deposit and we'll get you booked in for next Tuesday?",
    },
    {
      num: '#JK-3214',
      missing: [
        ['Consumer unit', 'photo'],
        ['EICR scope', 'rooms covered'],
        ['Deposit', 'materials'],
      ],
      todos: [
        { icon: '⚡', title: 'NICEIC cert prep', pill: 'Pending', pillOut: false, sub: 'Domestic Installer scheme covered' },
        { icon: '📅', title: 'EICR scheduled', pill: 'Drafted', pillOut: true, sub: 'Half day, 3-bed flat, Tuesday AM' },
      ],
      waTo: 'Ms Brown',
      waMsg: "Hi Ms Brown, to get the fuse-board upgrade booked, could you send a photo of the existing consumer unit, confirm which rooms need the EICR, and the deposit so we can order the parts?",
    },
    {
      num: '#JK-4102',
      missing: [
        ['Loft photo', 'leak source'],
        ['Ladder access', 'height & garden'],
        ['Scaffold quote', 'if needed'],
        ['Insurance ref', 'claim number'],
      ],
      todos: [
        { icon: '🪜', title: 'Materials order', pill: 'Drafted', pillOut: true, sub: 'Tile pack, lead flashing, sealant' },
        { icon: '📋', title: 'Insurance claim note', pill: 'Open', pillOut: false, sub: 'Photo report for loss adjuster' },
      ],
      waTo: 'Mr Adebayo',
      waMsg: "Hi Mr Adebayo, to get your roof leak sorted I need a photo from the loft showing where it's coming through, your insurance claim number, and a quick note on whether the rear garden gives ladder access — we'll bring the kit accordingly.",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on job ${c.num}?`;
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
