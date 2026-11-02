/* ==========================================================================
   Neural Networks Visual Notes — Canvas Renderers
   Hand-drawn diagrams via Rough.js. Each function targets a canvas id.
   ========================================================================== */

// ------------------------------------------------------------------
// Q1: Biological Neuron Processing (animated signal)
// ------------------------------------------------------------------
let q1Anim = null;
function renderQ1(t) {
  const cv = document.getElementById("cv-q1");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const rc = rough.canvas(cv);
  ctx.clearRect(0, 0, cv.width, cv.height);

  // Dendrites
  rc.line(40, 40, 150, 75, { stroke: '#9ca3af', strokeWidth: 2 });
  rc.line(40, 75, 150, 75, { stroke: '#9ca3af', strokeWidth: 2 });
  rc.line(40, 110, 150, 75, { stroke: '#9ca3af', strokeWidth: 2 });

  // Soma (Processor)
  rc.circle(190, 75, 65, { fill: '#dbeafe', stroke: '#2563eb', strokeWidth: 2, fillWeight: 1.2 });

  // Axon
  rc.line(225, 75, 420, 75, { stroke: '#4b5563', strokeWidth: 3 });

  // Synaptic ends
  rc.line(420, 75, 500, 45, { stroke: '#9ca3af', strokeWidth: 2 });
  rc.line(420, 75, 500, 105, { stroke: '#9ca3af', strokeWidth: 2 });

  ctx.fillStyle = "#111827";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Dendrites (Inputs)", 85, 25);
  ctx.fillText("Soma (Processor)", 190, 80);
  ctx.fillText("Axon (Transmitter)", 320, 65);
  ctx.fillText("Synapses", 500, 25);

  if (t >= 0 && t <= 1) {
    let x, y;
    if (t < 0.35) {
      x = 40 + (t / 0.35) * (190 - 40);
      y = 75;
    } else if (t < 0.65) {
      x = 190;
      y = 75;
      ctx.beginPath();
      ctx.arc(190, 75, 34 + 6 * Math.sin((t - 0.35) / 0.3 * Math.PI), 0, Math.PI * 2);
      ctx.fillStyle = "rgba(37, 99, 235, 0.3)";
      ctx.fill();
    } else {
      x = 225 + ((t - 0.65) / 0.35) * (500 - 225);
      y = 75;
    }
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();
  }
}

function initQ1() {
  const btn = document.getElementById("btn-fire-q1");
  if (!btn) return;
  btn.addEventListener("click", () => {
    let start = null;
    cancelAnimationFrame(q1Anim);
    function step(ts) {
      if (!start) start = ts;
      let progress = (ts - start) / 1000;
      if (progress <= 1) {
        renderQ1(progress);
        q1Anim = requestAnimationFrame(step);
      } else {
        renderQ1(-1);
      }
    }
    q1Anim = requestAnimationFrame(step);
  });
  renderQ1(-1);
}

// ------------------------------------------------------------------
// Q2: MP Neuron Interactive Circuit
// ------------------------------------------------------------------
const q2State = { f1: 0, f2: 0, f3: 0, inh: 0 };

function initQ2() {
  const handlers = {
    btn-q2-f1: 'f1',
    btn-q2-f2: 'f2',
    btn-q2-f3: 'f3',
    btn-q2-inh: 'inh'
  };
  Object.keys(handlers).forEach(btnId => {
    const b = document.getElementById(btnId);
    if (!b) return;
    b.addEventListener("click", () => {
      const k = handlers[btnId];
      q2State[k] = q2State[k] ? 0 : 1;
      if (k === 'inh') {
        b.className = q2State[k] ? 'interactive-btn active-danger' : 'interactive-btn';
        b.innerText = `🚫 Not Made in India: ${q2State[k]}`;
      } else {
        b.className = q2State[k] ? 'interactive-btn active' : 'interactive-btn';
        const labels = { f1: '5G Support', f2: 'Affordable Price', f3: 'OLED Display' };
        b.innerText = `${labels[k]}: ${q2State[k]}`;
      }
      renderQ2();
    });
  });
  renderQ2();
}

function renderQ2() {
  const cv = document.getElementById("cv-q2");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);
  c.clearRect(0, 0, cv.width, cv.height);

  const sum = q2State.f1 + q2State.f2 + q2State.f3;
  const active = sum >= 2 && q2State.inh === 0;

  const items = [
    { y: 40, v: q2State.f1, name: '5G' },
    { y: 85, v: q2State.f2, name: 'Price' },
    { y: 130, v: q2State.f3, name: 'OLED' }
  ];

  items.forEach(it => {
    rc.line(80, it.y, 240, 95, { stroke: it.v ? '#059669' : '#d1d5db', strokeWidth: it.v ? 2.5 : 1.5 });
    c.fillStyle = it.v ? '#059669' : '#6b7280';
    c.font = "bold 11px sans-serif";
    c.textAlign = "right";
    c.fillText(`${it.name} (${it.v})`, 70, it.y + 4);
  });

  rc.line(260, 175, 260, 135, { stroke: q2State.inh ? '#dc2626' : '#d1d5db', strokeWidth: q2State.inh ? 3 : 1.5 });
  rc.circle(260, 135, 10, { fill: q2State.inh ? '#dc2626' : '#fff', stroke: '#dc2626', strokeWidth: 2 });
  c.fillStyle = q2State.inh ? '#dc2626' : '#6b7280';
  c.font = "11px sans-serif";
  c.textAlign = "center";
  c.fillText(`Veto = ${q2State.inh}`, 260, 186);

  rc.circle(260, 95, 65, {
    fill: active ? '#d1fae5' : (q2State.inh ? '#fee2e2' : '#f3f4f6'),
    stroke: active ? '#059669' : (q2State.inh ? '#dc2626' : '#9ca3af'),
    strokeWidth: 2
  });

  c.fillStyle = "#111827";
  c.font = "12px sans-serif";
  c.textAlign = "center";
  c.fillText(`Σ = ${sum}`, 260, 90);
  c.fillText(`θ = 2`, 260, 106);

  rc.line(295, 95, 450, 95, { stroke: active ? '#059669' : '#9ca3af', strokeWidth: active ? 3 : 2 });
  c.fillStyle = active ? '#059669' : '#dc2626';
  c.font = "bold 13px sans-serif";
  c.textAlign = "left";
  c.fillText(active ? "y = 1 (BUY)" : "y = 0 (REJECT)", 460, 99);
}

// ------------------------------------------------------------------
// Q4: Monotonic vs Non-Monotonic Step
// ------------------------------------------------------------------
function renderQ4() {
  const cv = document.getElementById("cv-q4");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);

  rc.line(60, 110, 240, 110, { stroke: '#9ca3af' });
  rc.line(60, 110, 60, 30, { stroke: '#9ca3af' });
  rc.line(60, 100, 140, 100, { stroke: '#2563eb', strokeWidth: 2.5 });
  rc.line(140, 100, 140, 45, { stroke: '#2563eb', strokeWidth: 2.5 });
  rc.line(140, 45, 230, 45, { stroke: '#2563eb', strokeWidth: 2.5 });

  c.fillStyle = "#111827";
  c.font = "11px sans-serif";
  c.textAlign = "center";
  c.fillText("Excitatory Only (Monotonic: 0 → 1)", 150, 20);

  rc.line(320, 110, 500, 110, { stroke: '#9ca3af' });
  rc.line(320, 110, 320, 30, { stroke: '#9ca3af' });
  rc.line(320, 45, 400, 45, { stroke: '#dc2626', strokeWidth: 2.5 });
  rc.line(400, 45, 400, 100, { stroke: '#dc2626', strokeWidth: 2.5 });
  rc.line(400, 100, 490, 100, { stroke: '#dc2626', strokeWidth: 2.5 });

  c.fillText("NOT Logic (Non-Monotonic: 1 → 0)", 410, 20);
}

// ------------------------------------------------------------------
// Q5: Hypercube Origin Touch
// ------------------------------------------------------------------
function renderQ5() {
  const cv = document.getElementById("cv-q5");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);

  rc.line(180, 100, 300, 100, { stroke: '#9ca3af' });
  rc.line(180, 100, 180, 20, { stroke: '#9ca3af' });
  rc.line(180, 100, 100, 135, { stroke: '#9ca3af' });

  rc.circle(180, 100, 12, { fill: '#dc2626', stroke: '#dc2626', fillWeight: 2 });
  c.fillStyle = "#dc2626";
  c.font = "bold 12px sans-serif";
  c.textAlign = "left";
  c.fillText("(0, 0, 0, 0, 0, 0)", 195, 115);

  rc.line(80, 140, 280, 60, { stroke: '#2563eb', strokeWidth: 2 });
  c.fillStyle = "#2563eb";
  c.font = "11px sans-serif";
  c.fillText("Hyperplane: Σ xᵢ = 0", 250, 50);
}

// ------------------------------------------------------------------
// Q6: Linearly Separable n=1
// ------------------------------------------------------------------
function renderQ6() {
  const cv = document.getElementById("cv-q6");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);

  const cx = 80;
  rc.line(cx, 80, cx + 400, 80, { stroke: '#64748b', strokeWidth: 2 });

  rc.circle(cx + 80, 80, 14, { fill: '#3b82f6', stroke: '#3b82f6', fillWeight: 2 });
  rc.circle(cx + 320, 80, 14, { fill: '#10b981', stroke: '#10b981', fillWeight: 2 });

  c.fillStyle = "#111827";
  c.font = "12px sans-serif";
  c.textAlign = "center";
  c.fillText("x = 0", cx + 80, 115);
  c.fillText("x = 1", cx + 320, 115);

  rc.line(cx + 200, 45, cx + 200, 115, { stroke: '#ef4444', strokeWidth: 2, strokeLineDash: [4, 4] });
  c.fillStyle = "#ef4444";
  c.fillText("Threshold θ", cx + 200, 35);
}

// ------------------------------------------------------------------
// Q8: OR Gate Point Separation (Zero Updates)
// ------------------------------------------------------------------
function renderQ8() {
  const cv = document.getElementById("cv-q8");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);

  const ox = 140, oy = 140, scale = 75;

  rc.line(ox, oy, ox + 150, oy, { stroke: '#94a3b8' });
  rc.line(ox, oy, ox, oy - 120, { stroke: '#94a3b8' });

  rc.line(ox - 35, oy + 35, ox + 120, oy - 120, { stroke: '#2563eb', strokeWidth: 2 });

  const pts = [
    { x: 0, y: 0, col: '#475569', label: '(0,0) → 0' },
    { x: 0, y: 1, col: '#059669', label: '(0,1) → 1' },
    { x: 1, y: 0, col: '#059669', label: '(1,0) → 1' },
    { x: 1, y: 1, col: '#059669', label: '(1,1) → 1' }
  ];

  pts.forEach(p => {
    const px = ox + p.x * scale;
    const py = oy - p.y * scale;
    rc.circle(px, py, 10, { fill: p.col, stroke: p.col, fillWeight: 2 });
    c.fillStyle = "#111827";
    c.font = "10px sans-serif";
    c.textAlign = "center";
    c.fillText(p.label, px, py - 10);
  });

  c.fillStyle = "#2563eb";
  c.font = "10px sans-serif";
  c.fillText("wᵀx > 0 Region", ox + 120, oy - 60);
}

// ------------------------------------------------------------------
// Q9: NAND Failure Without Bias
// ------------------------------------------------------------------
function renderQ9() {
  const cv = document.getElementById("cv-q9");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);

  const ox = 140, oy = 150, scale = 75;
  rc.line(ox, oy, ox + 150, oy, { stroke: '#94a3b8' });
  rc.line(ox, oy, ox, oy - 120, { stroke: '#94a3b8' });

  rc.line(ox - 30, oy + 30, ox + 130, oy - 130, { stroke: '#dc2626', strokeWidth: 2, strokeLineDash: [4, 4] });

  const pts = [
    { x: 0, y: 0, col: '#059669', label: '(0,0) Target=1' },
    { x: 0, y: 1, col: '#059669', label: '(0,1) Target=1' },
    { x: 1, y: 0, col: '#059669', label: '(1,0) Target=1' },
    { x: 1, y: 1, col: '#dc2626', label: '(1,1) Target=0' }
  ];

  pts.forEach(p => {
    const px = ox + p.x * scale;
    const py = oy - p.y * scale;
    rc.circle(px, py, 10, { fill: p.col, stroke: p.col, fillWeight: 2 });
    c.fillStyle = "#111827";
    c.font = "10px sans-serif";
    c.textAlign = "center";
    c.fillText(p.label, px, py + (p.x === 0 && p.y === 0 ? 18 : -10));
  });

  c.fillStyle = "#dc2626";
  c.font = "bold 11px sans-serif";
  c.fillText("Origin trapped on boundary: wᵀ[0,0] = 0 (Never > 0)", ox + 150, oy + 25);
}

// ------------------------------------------------------------------
// Q10: Orthogonal Weight Vector (slider-driven)
// ------------------------------------------------------------------
function initQ10() {
  const slider = document.getElementById("q10-slider");
  if (!slider) return;
  slider.addEventListener("input", (e) => {
    renderQ10(parseFloat(e.target.value));
  });
  renderQ10(parseFloat(slider.value));
}

function renderQ10(deg) {
  const cv = document.getElementById("cv-q10");
  if (!cv) return;
  const c = cv.getContext("2d");
  const rc = rough.canvas(cv);
  c.clearRect(0, 0, cv.width, cv.height);

  const cx = 250, cy = 100;
  const rad = (deg * Math.PI) / 180;
  const dx = Math.cos(rad), dy = Math.sin(rad);
  const nx = -dy, ny = dx;

  rc.line(cx - dx * 160, cy - dy * 160, cx + dx * 160, cy + dy * 160, { stroke: '#2563eb', strokeWidth: 2.5 });

  const len = 70;
  rc.line(cx, cy, cx + nx * len, cy + ny * len, { stroke: '#dc2626', strokeWidth: 3 });

  const s = 12;
  rc.line(cx + dx * s, cy + dy * s, cx + dx * s + nx * s, cy + dy * s + ny * s, { stroke: '#6b7280' });
  rc.line(cx + dx * s + nx * s, cy + dy * s + ny * s, cx + nx * s, cy + ny * s, { stroke: '#6b7280' });

  c.fillStyle = "#2563eb";
  c.font = "12px sans-serif";
  c.textAlign = "center";
  c.fillText("Boundary: wᵀx + b = 0", cx - dx * 80, cy - dy * 80 - 15);

  c.fillStyle = "#dc2626";
  c.font = "bold 12px sans-serif";
  c.fillText("w (Normal)", cx + nx * (len + 15), cy + ny * (len + 15));
}