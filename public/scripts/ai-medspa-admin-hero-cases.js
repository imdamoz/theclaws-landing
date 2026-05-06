(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#MS-2847',
      missing: [
        ['Pre-treatment form', 'unsigned'],
        ['Deposit', '£50 booking'],
        ['Allergy form', 'missing'],
        ['Photo of area', 'before'],
      ],
      todos: [
        { icon: '💉', title: 'Pre-treatment confirmation', pill: 'Drafted', pillOut: false, sub: 'No retinol 48h, no alcohol day before' },
        { icon: '🔁', title: 'Rebook reminder', pill: 'Reviewed', pillOut: true, sub: '12-week filler top-up with photo prompt' },
      ],
      waTo: 'Ms Khan',
      waMsg: "Hi Ms Khan, lovely to hear from you! To get your consult booked could you complete the pre-treatment form, the allergy declaration, the £50 booking deposit, and ping over a quick photo of the area you'd like treated?",
    },
    {
      num: '#MS-3214',
      missing: [
        ['Skin assessment', 'photo set'],
        ['Course payment', '6-treatment plan'],
        ['Patch test slot', 'booked'],
      ],
      todos: [
        { icon: '✨', title: 'Treatment plan', pill: 'Drafted', pillOut: false, sub: 'Hydrafacial course of 6, 4-week intervals' },
        { icon: '📅', title: 'Patch test scheduled', pill: 'Reviewed', pillOut: true, sub: 'Required 24h before first treatment' },
      ],
      waTo: 'Ms Brown',
      waMsg: "Hi Ms Brown, thanks for the consult! For your Hydrafacial course we just need a clear set of skin photos in good light, the course payment to lock the slots in, and to book a 15-minute patch test 24h before the first session.",
    },
    {
      num: '#MS-4102',
      missing: [
        ['Medical history', 'full'],
        ['ID', 'over-18 verification'],
        ['Consent form', 'signed'],
        ['Anti-coagulant note', 'GP letter'],
      ],
      todos: [
        { icon: '⚠️', title: 'Contraindication flag', pill: 'Pending', pillOut: false, sub: 'Recent isotretinoin — 6mo wait advised' },
        { icon: '🩺', title: 'Virtual consult', pill: 'Drafted', pillOut: true, sub: '15min before booking — flagged to nurse' },
      ],
      waTo: 'Ms Adebayo',
      waMsg: "Hi Ms Adebayo, before booking we'd like a quick 15-minute virtual consult to go through a couple of things from your medical history. In the meantime could you complete the consent form and send a clear photo of your ID for over-18 verification?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on consult ${c.num}?`;
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
