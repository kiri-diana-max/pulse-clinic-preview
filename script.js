(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('js');
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
    }), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
    const scene = new IntersectionObserver(entries => {
      hero.classList.toggle('motion-hidden', !entries[0].isIntersecting);
    }, {threshold: .05});
    scene.observe(hero);
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  document.addEventListener('visibilitychange', () => {
    hero.classList.toggle('motion-hidden', document.hidden);
  });
  if (reduced.matches) hero.classList.add('motion-paused');
  const months = {
    sep: { revenue: 1397000, expenses: 1556255, surgery: 1073000, delta: '−165 000 ₽ к августу' },
    aug: { revenue: 1562000, expenses: 1638271, surgery: 1248000, delta: 'Месяц для сравнения с сентябрём' }
  };
  const format = new Intl.NumberFormat('ru-RU');
  const money = value => `${value < 0 ? '−' : ''}${format.format(Math.abs(value))} <small>₽</small>`;
  document.querySelector('#month').addEventListener('change', event => {
    const data = months[event.target.value];
    document.querySelector('#revenue').innerHTML = money(data.revenue);
    document.querySelector('#expenses').innerHTML = money(data.expenses);
    document.querySelector('#profit').innerHTML = money(data.revenue - data.expenses);
    document.querySelector('#delta').textContent = data.delta;
    const share = Math.round(data.surgery / data.revenue * 1000) / 10;
    const other = Math.round((100 - share) * 10) / 10;
    document.querySelector('#surgery-share').textContent = `${format.format(share)}%`;
    document.querySelector('#other-share').textContent = `${format.format(other)}%`;
    document.querySelector('#surgery-bar').style.width = `${share}%`;
    document.querySelector('#other-bar').style.width = `${other}%`;
  });
})();
