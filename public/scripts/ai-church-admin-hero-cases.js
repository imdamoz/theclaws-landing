(() => {
  const docIcon = '<svg class="chip-ic" width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

  const cases = [
    {
      num: 'this week',
      missing: [
        ['Pastoral reply', '4 days waiting'],
        ['Gift Aid form', '2 donors'],
        ['DBS check', 'new volunteer'],
        ['School admission', 'faith reference'],
      ],
      todos: [
        { icon: '🙏', title: 'Counselling intake', pill: 'Urgent', pillOut: false, sub: 'Crisis flag, pastor reply needed today' },
        { icon: '📅', title: 'Sunday school sign-up', pill: 'Reviewed', pillOut: true, sub: 'All 24 children registered, allergens noted' },
      ],
      waTo: 'Sarah',
      waMsg: "Hi Sarah, hope you're well. Thank you for your message — sorry it took us a little while to come back to you. Could you let us know a good time this week for a chat with one of the pastoral team, and confirm whether your child will be joining the youth retreat?",
    },
    {
      num: 'this week',
      missing: [
        ['Funeral booking', 'family contact'],
        ['Bereavement card', 'not sent'],
        ['Hall booking', 'wake'],
        ['Order of service', 'not drafted'],
      ],
      todos: [
        { icon: '🕊', title: 'Pastoral visit', pill: 'Open', pillOut: false, sub: 'Family asked for a home visit before service' },
        { icon: '✏️', title: 'Order of service', pill: 'Drafted', pillOut: true, sub: 'Two readings and one hymn confirmed' },
      ],
      waTo: 'The Hughes family',
      waMsg: "Dear Hughes family, please accept our deepest condolences. We have set aside Thursday at 11am for the service — would that work? I will pop round on Wednesday afternoon to walk through the order of service together, and we have the church hall reserved for the wake.",
    },
    {
      num: 'this week',
      missing: [
        ['Baptism registration', 'godparents'],
        ['Standing order', 'amount unclear'],
        ['Volunteer rota', 'two gaps'],
        ['Newsletter copy', 'youth section'],
      ],
      todos: [
        { icon: '💧', title: 'Baptism prep', pill: 'Sunday', pillOut: false, sub: 'Family meeting and godparent forms' },
        { icon: '📨', title: 'Welcome pack', pill: 'Sent', pillOut: true, sub: 'Three new families, follow-up scheduled' },
      ],
      waTo: 'The Adeyemi family',
      waMsg: "Hi Adeyemi family, lovely to see you on Sunday! To get the baptism booked in for next month could you send the godparents' full names, confirm the date that works for you, and let us know if you would like the family lunch in the hall after the service?",
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
    bubble.innerHTML = `<span class="spark"></span> What needs attention ${c.num}?`;
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
