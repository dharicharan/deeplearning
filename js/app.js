/* ==========================================================================
   Neural Networks Visual Notes — App Logic
   Renders weeks from NOTES_DATA, handles navigation, search, and canvas init.
   ========================================================================== */

(() => {
  const weekNav = document.getElementById("week-nav");
  const notesMain = document.getElementById("notes-main");
  const searchInput = document.getElementById("notes-search");

  let currentWeek = "week-1";
  let activeCanvasInits = [];

  /* ------------------------------------------------------------------ */
  /*  Build week navigation                                             */
  /* ------------------------------------------------------------------ */
  function buildWeekNav() {
    weekNav.innerHTML = "";
    WEEKS_ORDER.forEach(wk => {
      const meta = WEEKS_META[wk];
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = meta.badge;
      a.className = wk === currentWeek ? "active" : "";
      a.dataset.week = wk;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        switchWeek(wk);
      });
      weekNav.appendChild(a);
    });
    setWeekNavAria();
  }

  function setWeekNavAria() {
    const links = weekNav.querySelectorAll("a");
    links.forEach(a => {
      a.setAttribute("aria-current", a.dataset.week === currentWeek ? "true" : "false");
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Render a single question card from data                           */
  /* ------------------------------------------------------------------ */
  function renderQuestionCard(q) {
    const card = document.createElement("section");
    card.className = "q-card";
    card.dataset.qid = q.id;

    let canvasHtml = "";
    if (q.canvas) {
      canvasHtml = `
        <div class="canvas-container">
          <canvas id="${q.canvasId}" width="560" height="150"></canvas>
        </div>`;
    }

    let controlsHtml = "";
    if (q.interactive) {
      if (q.id === "q1") {
        controlsHtml = `<div class="controls"><button class="interactive-btn" id="btn-fire-q1">⚡ Stimulate Synaptic Input</button></div>`;
      } else if (q.id === "q2") {
        controlsHtml = `
          <div class="controls">
            <button class="interactive-btn" id="btn-q2-f1">5G Support: 0</button>
            <button class="interactive-btn" id="btn-q2-f2">Affordable Price: 0</button>
            <button class="interactive-btn" id="btn-q2-f3">OLED Display: 0</button>
            <button class="interactive-btn" id="btn-q2-inh">🚫 Not Made in India: 0</button>
          </div>`;
      } else if (q.id === "q10") {
        controlsHtml = `
          <div class="controls">
            <label style="font-size: 0.85rem; color: var(--muted);">Rotate Decision Plane:</label>
            <input type="range" id="q10-slider" min="-45" max="45" value="15">
          </div>`;
      }
    }

    let theoryHtml = "";
    if (q.theory && q.theory.length) {
      const items = q.theory.map(t => "<li>" + t + "</li>").join("");
      theoryHtml = `
        <div class="section-label">Core Theory</div>
        <div class="theory-box"><ul>${items}</ul></div>`;
    }

    let analogyHtml = "";
    if (q.analogy) {
      analogyHtml = `<div class="app-box"><strong>Real-World Analogy:</strong> ${q.analogy}</div>`;
    }

    card.innerHTML = `
      <div class="q-title">
        <span>${q.title}</span>
        <span class="pill pill-green">${q.pill}</span>
      </div>
      <div class="prompt-box">
        <strong>Question:</strong> ${q.question}
        ${q.options ? "<br><br><strong>Options:</strong> " + q.options : ""}
        ${q.correct ? "<br><br><strong>Correct Answer:</strong> <strong style='color:var(--success);'>" + q.correct + "</strong>" : ""}
      </div>
      ${canvasHtml}
      ${controlsHtml}
      ${theoryHtml}
      ${analogyHtml}
    `;

    return card;
  }
  /* ------------------------------------------------------------------ */
  /*  Render a full week section                                        */
  /* ------------------------------------------------------------------ */
  function renderWeek(wk) {
    const meta = WEEKS_META[wk];
    const data = NOTES_DATA[wk];
    if (!data) return;

    const section = document.createElement("section");
    section.id = wk;
    section.className = "week-section" + (wk === currentWeek ? " active" : "");

    const headerHtml = `
      <div class="week-header">
        <span class="week-badge">${meta.badge}</span>
        <h2 class="week-title">${meta.title}</h2>
      </div>`;

    let practiceHtml = `<div class="week-part practice"><span class="part-label">Practice Questions</span>`;
    if (data.practice && data.practice.length) {
      data.practice.forEach(q => {
        practiceHtml += renderQuestionCard(q).outerHTML;
      });
    } else {
      practiceHtml += `
        <div class="placeholder-card">
          <h4>Practice — coming soon</h4>
          <p>Add practice questions for ${meta.title} here.</p>
        </div>`;
    }
    practiceHtml += `</div>`;

    let gradedHtml = `<div class="week-part graded"><span class="part-label">Graded Questions</span>`;
    if (data.graded && data.graded.length) {
      data.graded.forEach(q => {
        gradedHtml += renderQuestionCard(q).outerHTML;
      });
    } else {
      gradedHtml += `
        <div class="placeholder-card">
          <h4>Graded — coming soon</h4>
          <p>Add graded questions for ${meta.title} here.</p>
        </div>`;
    }
    gradedHtml += `</div>`;

    section.innerHTML = headerHtml + practiceHtml + gradedHtml;
    notesMain.appendChild(section);

    const inits = [];
    if (data.practice) data.practice.forEach(q => {
      if (q.canvas && q.interactive) {
        if (q.id === "q1") inits.push(initQ1);
        if (q.id === "q2") inits.push(initQ2);
        if (q.id === "q10") inits.push(initQ10);
      }
    });
    if (data.graded) data.graded.forEach(q => {
      if (q.canvas && q.interactive) {
        if (q.id === "q1") inits.push(initQ1);
        if (q.id === "q2") inits.push(initQ2);
        if (q.id === "q10") inits.push(initQ10);
      }
    });
    activeCanvasInits = inits;
  }

  /* ------------------------------------------------------------------ */
  /*  Render all weeks (hidden by default, shown via active class)      */
  /* ------------------------------------------------------------------ */
  function renderAllWeeks() {
    notesMain.innerHTML = "";
    WEEKS_ORDER.forEach(wk => renderWeek(wk));
    buildWeekNav();
    switchWeek(currentWeek);
  }
  /* ------------------------------------------------------------------ */
  /*  Switch active week                                                */
  /* ------------------------------------------------------------------ */
  function switchWeek(wk) {
    if (NOTES_DATA[wk] === undefined) return;
    currentWeek = wk;

    const links = weekNav.querySelectorAll("a");
    links.forEach(a => {
      a.className = a.dataset.week === wk ? "active" : "";
    });
    setWeekNavAria();

    const sections = notesMain.querySelectorAll(".week-section");
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === wk);
    });

    activeCanvasInits.forEach(fn => fn());

    if (window.renderMathInElement) {
      const sec = document.getElementById(wk);
      if (sec) renderMathInElement(sec, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false
      });
    }

    notesMain.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------------------------------------------ */
  /*  Search / filter across all question cards                         */
  /* ------------------------------------------------------------------ */
  function filterNotes(query) {
    const q = query.toLowerCase().trim();
    const cards = notesMain.querySelectorAll(".q-card");

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = q === "" || text.includes(q);
      card.style.display = match ? "block" : "none";
    });

    document.querySelectorAll(".week-part").forEach(part => {
      const cardsInPart = part.querySelectorAll(".q-card");
      const visibleInPart = Array.from(cardsInPart).filter(c => c.style.display !== "none").length;
      let empty = part.querySelector(".empty-state");
      if (visibleInPart === 0 && cardsInPart.length > 0) {
        if (!empty) {
          empty = document.createElement("div");
          empty.className = "empty-state";
          empty.innerHTML = "<h2>No matching notes</h2><p>Try a different keyword.</p>";
          part.appendChild(empty);
        }
      } else {
        if (empty) empty.remove();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => filterNotes(e.target.value));
  }

  /* ------------------------------------------------------------------ */
  /*  Bootstrap                                                         */
  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderAllWeeks();
  });
})();