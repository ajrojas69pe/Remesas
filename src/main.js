import './style.css';

const initial = JSON.parse(localStorage.getItem('remesas-transactions') || '[]');
const state = { transactions: initial };

function money(n) { return new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN'}).format(n); }
function render() {
  const total = state.transactions.reduce((s,t)=>s+t.pen,0);
  const count = state.transactions.length;
  document.querySelector('#app').innerHTML = `
    <main class="shell">
      <header><div><span class="eyebrow">OPERACIONES · REMESAS</span><h1>Remesas Control</h1><p>Calcula, registra y consulta operaciones Perú → Venezuela.</p></div><div class="status">● Local · seguro</div></header>
      <section class="grid">
        <article class="card calculator"><h2>Nueva operación</h2>
          <label>Monto en soles (PEN)<input id="pen" type="number" min="0" step="0.01" placeholder="100.00"></label>
          <label>Tasa PEN → USDT<input id="rate" type="number" min="0" step="0.0001" value="3.55"></label>
          <label>Factor de optimización<input id="factor" type="number" min="0" step="0.01" value="1.27"></label>
          <div class="result"><span>USDT estimados</span><strong id="usdt">S/ 0.00</strong></div>
          <button id="save">Registrar operación</button>
        </article>
        <article class="card"><h2>Resumen</h2><div class="metrics"><div><b>${count}</b><span>operaciones</span></div><div><b>${money(total)}</b><span>volumen PEN</span></div></div><div class="note">Los datos se guardan localmente en este navegador.</div></article>
      </section>
      <section class="card"><div class="section-head"><h2>Historial</h2><button class="ghost" id="clear">Limpiar</button></div><div class="table-wrap"><table><thead><tr><th>Fecha</th><th>PEN</th><th>Tasa</th><th>Factor</th><th>USDT</th></tr></thead><tbody>${state.transactions.length ? state.transactions.map(t=>`<tr><td>${new Date(t.date).toLocaleString('es-PE')}</td><td>${money(t.pen)}</td><td>${t.rate}</td><td>${t.factor}x</td><td>${t.usdt.toFixed(2)}</td></tr>`).join('') : '<tr><td colspan="5" class="empty">Aún no hay operaciones.</td></tr>'}</tbody></table></div></section>
    </main>`;
  const calc=()=>{const p=Number(document.querySelector('#pen').value)||0,r=Number(document.querySelector('#rate').value)||0,f=Number(document.querySelector('#factor').value)||0;document.querySelector('#usdt').textContent=(p/r*f).toFixed(2)+' USDT';};
  ['pen','rate','factor'].forEach(id=>document.querySelector('#'+id).addEventListener('input',calc));
  document.querySelector('#save').onclick=()=>{const p=Number(document.querySelector('#pen').value),r=Number(document.querySelector('#rate').value),f=Number(document.querySelector('#factor').value);if(!(p>0&&r>0&&f>0))return alert('Completa los valores correctamente.');state.transactions.unshift({date:new Date().toISOString(),pen:p,rate:r,factor:f,usdt:p/r*f});localStorage.setItem('remesas-transactions',JSON.stringify(state.transactions));render();};
  document.querySelector('#clear').onclick=()=>{if(confirm('¿Eliminar todo el historial local?')){state.transactions=[];localStorage.removeItem('remesas-transactions');render();}};
}
render();
