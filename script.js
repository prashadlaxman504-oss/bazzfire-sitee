// ---------- Rising ember particle background ----------
(function () {
  const canvas = document.getElementById("embers");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, particles;
  const COLORS = ["255, 90, 31", "255, 182, 39", "200, 29, 37"];
  const COUNT = 46;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function makeParticle(spawnAnywhere) {
    return {
      x: Math.random() * width,
      y: spawnAnywhere ? Math.random() * height : height + Math.random() * 100,
      r: 1 + Math.random() * 2.4,
      speed: 0.3 + Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.25 + Math.random() * 0.55,
      flicker: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => makeParticle(true));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.y -= p.speed;
      p.x += p.drift + Math.sin(p.y * 0.01 + p.flicker) * 0.3;
      p.flicker += 0.02;

      if (p.y < -10) Object.assign(p, makeParticle(false));

      const glow = 0.6 + Math.sin(p.flicker) * 0.4;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha * glow})`;
      ctx.shadowColor = `rgba(${p.color}, ${glow})`;
      ctx.shadowBlur = 6;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  init();

  if (!reduceMotion) {
    requestAnimationFrame(tick);
  }
})();

// ---------- Copy email on click ----------
(function () {
  const emailBtn = document.querySelector(".footer-email");
  if (!emailBtn) return;

  const label = emailBtn.querySelector(".email-text");
  const original = label.textContent;
  const email = emailBtn.dataset.email;

  emailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "Copied!";
    } catch (err) {
      label.textContent = email;
    }
    setTimeout(() => {
      label.textContent = original;
    }, 1600);
  });
})();
