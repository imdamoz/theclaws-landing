(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#VET-2847',
      missing: [
        ['Vaccination card', 'last booster'],
        ['Weight chart', '6-month trend'],
        ['Allergy history', 'noted reaction'],
        ['Microchip', 'number not on file'],
      ],
      todos: [
        { icon: '💉', title: 'Booster reminder', pill: 'Drafted', pillOut: false, sub: 'Annual vaccinations due in 14 days' },
        { icon: '💊', title: 'Prescription refill', pill: 'Reviewed', pillOut: true, sub: 'Atopica due, vet check required for repeat' },
      ],
      waTo: 'Mrs Patel · Bailey',
      waMsg: "Hi Mrs Patel, hope Bailey's doing well! Annual booster is due in 14 days — could you book a slot, send a photo of his vaccination card so we can confirm last visit, and pop his microchip number through too? We've also got his Atopica refill ready for the same visit.",
    },
    {
      num: '#VET-3214',
      missing: [
        ['Pre-op bloods', 'ASA grade 1'],
        ['Fasting confirmation', '12h pre-anaesthetic'],
        ['Owner consent', 'castration form'],
      ],
      todos: [
        { icon: '🏥', title: 'Surgical day plan', pill: 'Drafted', pillOut: false, sub: 'Routine castration, GA recovery slot' },
        { icon: '📋', title: 'Discharge notes', pill: 'Reviewed', pillOut: true, sub: 'Post-op care, suture removal Day 10' },
      ],
      waTo: 'Mr Brown · Milo',
      waMsg: "Hi Mr Brown, looking forward to seeing Milo on Tuesday for his castration! Just need the consent form signed (link below), confirmation he'll be fasted from 8pm Monday, and we'll need to draw quick pre-op bloods on arrival.",
    },
    {
      num: '#VET-4102',
      missing: [
        ['Senior bloods', 'overdue 6 months'],
        ['Dental score', 'last grading'],
        ['Weight trend', '12% drop noted'],
        ['Insurance pre-auth', 'if claim needed'],
      ],
      todos: [
        { icon: '⚠️', title: 'Senior workup', pill: 'Pending', pillOut: false, sub: 'Bloods + UA + BP at next visit' },
        { icon: '🦷', title: 'Dental rebook', pill: 'Drafted', pillOut: true, sub: 'Grade 3 last seen, scale & polish due' },
      ],
      waTo: 'Ms Adebayo · Pepper',
      waMsg: "Hi Ms Adebayo, Pepper's annual visit is coming up. We've noticed a small weight change since last time and as she's now in our senior bracket we'd like to do bloods and a urine sample at the same visit. Could you book a 25-minute slot and let us know if you'd like an insurance pre-authorisation letter first?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on patient ${c.num}?`;
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
