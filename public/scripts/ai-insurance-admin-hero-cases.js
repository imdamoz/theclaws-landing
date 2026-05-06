(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: '#INS-2847',
      missing: [
        ['NCB proof', '7 years'],
        ['Vehicle photos', 'current'],
        ['Claims history', '5 yr declaration'],
        ['Occupation', 'update needed'],
      ],
      todos: [
        { icon: '📊', title: 'Renewal quote', pill: 'Drafted', pillOut: false, sub: '3 underwriter quotes, fair-value note attached' },
        { icon: '📞', title: 'Claim follow-up', pill: 'Reviewed', pillOut: true, sub: 'Loss adjuster doc pack ready, awaiting client sign' },
      ],
      waTo: 'Mr Khan',
      waMsg: "Hi Mr Khan, your renewal is in 21 days. To hold your no-claims discount and get the best price could you confirm your current occupation, send a quick photo of the vehicle, and confirm any incidents in the last 5 years (even non-fault)?",
    },
    {
      num: '#INS-3214',
      missing: [
        ['Buildings sum insured', 'rebuild cost'],
        ['Contents valuation', 'high-value items'],
        ['Alarm grade', 'NSI cert'],
      ],
      todos: [
        { icon: '🏠', title: 'Home renewal', pill: 'Drafted', pillOut: false, sub: 'Index-linked rebuild + £8K jewellery extension' },
        { icon: '🛡️', title: 'NSI grade check', pill: 'Reviewed', pillOut: true, sub: 'Grade 2 confirmed, premium discount applied' },
      ],
      waTo: 'Mrs Brown',
      waMsg: "Hi Mrs Brown, ahead of your home renewal could you confirm the buildings rebuild cost is still in line, list any single items over £2,500, and send a copy of your current alarm NSI certificate so we can keep the burglary discount?",
    },
    {
      num: '#INS-4102',
      missing: [
        ['Turnover', 'last 12 months'],
        ['Employee count', 'PAYE list'],
        ['Risk survey', 'site visit'],
        ['Claims experience', '5 yr CMR'],
      ],
      todos: [
        { icon: '🏗️', title: 'Commercial renewal', pill: 'Pending', pillOut: false, sub: 'Combined liability + plant + tools' },
        { icon: '📋', title: 'Risk survey', pill: 'Drafted', pillOut: true, sub: 'Booked with surveyor, 14 days out' },
      ],
      waTo: 'Mr Adebayo',
      waMsg: "Hi Mr Adebayo, for your commercial renewal we need updated turnover for the last 12 months, current employee count from your PAYE list, your latest 5-year claims experience report from the current insurer, and confirmation of a date for the site survey.",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention on policy ${c.num}?`;
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
