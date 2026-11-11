'use client'
import React, { useEffect, useRef } from 'react'

// A 3D model of the PowerCube built from six CSS faces. It turns slowly on its
// own and can be spun by dragging. Everything is sized in em, so changing the
// font size of the wrapper scales the whole unit. Pass a position class
// (relative or absolute) in className.
//
// Proportions follow the product renders: a near-square front, slim depth.
const W = 20;   // width  (em)
const H = 21;   // height (em)
const D = 6.5;  // depth  (em)

const AUTO_SPEED = 22;   // degrees per second
const START_ANGLE = -32;
const START_TILT = -14;

// light comes from the front-left
const LIGHT = { x: -0.55, z: 0.84 };

const perforated = {
  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.85) 0.13em, transparent 0.15em)',
  backgroundSize: '0.48em 0.48em',
};

const metal = '#3a3e41';
const metalDark = '#2d3134';

function Screw({ style }) {
  return (
    <span
      className='absolute h-[0.42em] w-[0.42em] rounded-full'
      style={{ background: 'radial-gradient(circle at 35% 35%, #8b9094, #3b3f42 70%)', ...style }}
    />
  );
}

function Shade({ shadeRef, base = 0.3 }) {
  return <div ref={shadeRef} className='pointer-events-none absolute inset-0 bg-black' style={{ opacity: base }} />;
}

const faceBase = 'absolute overflow-hidden [backface-visibility:hidden]';
const edge = { boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0.6em rgba(0,0,0,0.5)' };

function Front({ children, shadeRef, sheenRef }) {
  return (
    <div
      className={faceBase}
      style={{ width: `${W}em`, height: `${H}em`, transform: `translateZ(${D / 2}em)`, background: metal, ...edge }}
    >
      {/* top band: switch, display, status lights */}
      <div className='absolute inset-x-0 top-0 flex h-[24%] items-center justify-center gap-[0.9em]'>
        <span className='h-[1.1em] w-[0.6em] rounded-[0.12em] bg-[#b3261e] shadow-[inset_0_-0.15em_0_rgba(0,0,0,0.4)]' />
        <span className='flex h-[1.9em] w-[3.6em] items-center justify-center rounded-[0.2em] bg-[#0b1418] ring-1 ring-black/60'>
          <span className='font-mono text-[1.15em] font-bold tracking-[0.06em] text-[#5fd3ff] [text-shadow:0_0_0.4em_rgba(95,211,255,0.8)]'>100</span>
        </span>
        <span className='flex flex-col gap-[0.25em]'>
          <span className='h-[0.38em] w-[0.38em] rounded-full bg-[#4ade80] shadow-[0_0_0.4em_#4ade80]' />
          <span className='h-[0.38em] w-[0.38em] rounded-full bg-[#facc15] opacity-80' />
          <span className='h-[0.38em] w-[0.38em] rounded-full bg-[#ef4444] opacity-80' />
        </span>
      </div>

      {/* black brand band */}
      <div className='absolute inset-x-0 top-[24%] h-[56%] bg-[#151718] shadow-[inset_0_0.1em_0_rgba(255,255,255,0.05),inset_0_-0.1em_0_rgba(255,255,255,0.05)]'>
        <span
          className='absolute left-1/2 top-0 h-[17%] w-[34%] -translate-x-1/2'
          style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)', background: 'linear-gradient(118deg, #5cc86e 0 52%, #22844a 52% 100%)' }}
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-[#d9dcdd]'>
          <span className='text-[1.55em] font-medium tracking-[0.01em]'>PowerCube</span>
          <span className='mt-[0.5em] text-[0.55em]'>By</span>
          <span className='mt-[0.3em] text-[2.3em] font-bold leading-none tracking-[0.04em]'>VAAV</span>
        </div>
        <span
          className='absolute bottom-0 left-1/2 h-[17%] w-[40%] -translate-x-1/2'
          style={{ clipPath: 'polygon(28% 0, 72% 0, 100% 100%, 0 100%)', background: 'linear-gradient(62deg, #2f9a5a 0 50%, #1b6b55 50% 100%)' }}
        />
      </div>

      <Screw style={{ left: '0.5em', top: '0.5em' }} />
      <Screw style={{ right: '0.5em', top: '0.5em' }} />
      <Screw style={{ left: '0.5em', top: '33%' }} />
      <Screw style={{ right: '0.5em', top: '33%' }} />
      <Screw style={{ left: '0.5em', top: '70%' }} />
      <Screw style={{ right: '0.5em', top: '70%' }} />
      <Screw style={{ left: '0.5em', bottom: '0.5em' }} />
      <Screw style={{ right: '0.5em', bottom: '0.5em' }} />

      {/* moving highlight as the unit turns */}
      <div
        ref={sheenRef}
        className='pointer-events-none absolute inset-0'
        style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.09) 50%, transparent 65%)', backgroundSize: '300% 100%' }}
      />
      <Shade shadeRef={shadeRef} />
      {children}
    </div>
  );
}

function Back({ children, shadeRef }) {
  return (
    <div
      className={faceBase}
      style={{ width: `${W}em`, height: `${H}em`, transform: `rotateY(180deg) translateZ(${D / 2}em)`, background: metalDark, ...edge }}
    >
      <div className='absolute left-1/2 top-[38%] w-[52%] -translate-x-1/2 rounded-[0.3em] bg-[#d8dcd9] px-[0.8em] py-[0.7em] text-[#1d2120]'>
        <p className='text-[0.8em] font-bold tracking-[0.08em]'>VAAV</p>
        <p className='text-[0.62em] font-semibold'>PowerCube</p>
        <div className='mt-[0.4em] h-px bg-[#1d2120]/30' />
        <p className='mt-[0.4em] text-[0.5em] leading-snug'>Battery 960Wh · LiFePO4<br />Output 500W</p>
      </div>
      <Screw style={{ left: '0.5em', top: '0.5em' }} />
      <Screw style={{ right: '0.5em', top: '0.5em' }} />
      <Screw style={{ left: '0.5em', bottom: '0.5em' }} />
      <Screw style={{ right: '0.5em', bottom: '0.5em' }} />
      <Shade shadeRef={shadeRef} />
      {children}
    </div>
  );
}

// Right side: two round DC/solar sockets and a vent near the back edge.
// On this face the left edge meets the front.
function Right({ children, shadeRef }) {
  return (
    <div
      className={faceBase}
      style={{ width: `${D}em`, height: `${H}em`, left: `${(W - D) / 2}em`, transform: `rotateY(90deg) translateZ(${W / 2}em)`, background: metalDark, ...edge }}
    >
      {['22%', '34%'].map(top => (
        <span
          key={top}
          className='absolute left-[38%] h-[1.5em] w-[1.5em] -translate-x-1/2 rounded-full'
          style={{ top, background: 'radial-gradient(circle, #0b0c0d 30%, #3e4245 34%, #1a1c1d 62%, #4a4e51 100%)' }}
        />
      ))}
      <div className='absolute right-[12%] top-[46%] h-[22%] w-[38%]' style={perforated} />
      <Shade shadeRef={shadeRef} />
      {children}
    </div>
  );
}

// Left side: two vent panels. On this face the right edge meets the front.
function Left({ children, shadeRef }) {
  return (
    <div
      className={faceBase}
      style={{ width: `${D}em`, height: `${H}em`, left: `${(W - D) / 2}em`, transform: `rotateY(-90deg) translateZ(${W / 2}em)`, background: metalDark, ...edge }}
    >
      <div className='absolute inset-x-[16%] top-[30%] h-[14%]' style={perforated} />
      <div className='absolute inset-x-[16%] top-[54%] h-[14%]' style={perforated} />
      <Shade shadeRef={shadeRef} />
      {children}
    </div>
  );
}

// Top: vent grilles either side of an AC socket.
function Top({ children, shadeRef }) {
  return (
    <div
      className={faceBase}
      style={{ width: `${W}em`, height: `${D}em`, top: `${(H - D) / 2}em`, transform: `rotateX(90deg) translateZ(${H / 2}em)`, background: '#3a3e41', ...edge }}
    >
      <div className='absolute inset-y-[18%] left-[6%] w-[30%]' style={perforated} />
      <div className='absolute inset-y-[18%] right-[6%] w-[30%]' style={perforated} />
      <div className='absolute left-1/2 top-1/2 flex h-[3em] w-[3.2em] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[0.3em] bg-[#1c1e20] ring-1 ring-black/60'>
        <span className='relative h-[1.9em] w-[2em] rounded-[0.2em] bg-[#2b2e30]'>
          <span className='absolute left-[22%] top-[28%] h-[0.7em] w-[0.22em] bg-black' />
          <span className='absolute right-[22%] top-[28%] h-[0.7em] w-[0.22em] bg-black' />
          <span className='absolute bottom-[14%] left-1/2 h-[0.35em] w-[0.35em] -translate-x-1/2 rounded-full bg-black' />
        </span>
      </div>
      <Shade shadeRef={shadeRef} base={0.05} />
      {children}
    </div>
  );
}

function Bottom() {
  return (
    <div
      className={faceBase}
      style={{ width: `${W}em`, height: `${D}em`, top: `${(H - D) / 2}em`, transform: `rotateX(-90deg) translateZ(${H / 2}em)`, background: '#141617' }}
    >
      {[['8%', '20%'], ['92%', '20%'], ['8%', '80%'], ['92%', '80%']].map(([left, top]) => (
        <span key={left + top} className='absolute h-[0.9em] w-[0.9em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black' style={{ left, top }} />
      ))}
    </div>
  );
}

// A numbered marker that sits on a face of the model and turns with it.
function Pin({ id, n, x, y, label, active, dimmed, onPin }) {
  return (
    <button
      type='button'
      data-pin
      onClick={() => onPin && onPin(id)}
      aria-label={`${n}. ${label}`}
      aria-pressed={active}
      className='absolute flex h-[max(1.5em,18px)] w-[max(1.5em,18px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center'
      style={{ left: x, top: y }}
    >
      {active && <span className='absolute inset-0 rounded-full bg-brand-400 animate-pulse-ring' aria-hidden='true' />}
      <span className={`relative flex h-full w-full items-center justify-center rounded-full text-[max(0.75em,10px)] font-bold shadow-[0_0.2em_0.6em_rgba(0,0,0,0.5)] ring-2 transition ${active ? 'scale-125 bg-white text-brand-700 ring-brand-400' : `bg-brand-600 text-white ring-white hover:bg-brand-500 ${dimmed ? 'opacity-60' : ''}`}`}>
        {n}
      </span>
    </button>
  );
}

// Props:
//   autoRotate  turn slowly on its own (default true)
//   focus       { angle, tilt } to turn to and hold; null to release
//   pins        [{ id, n, face, x, y, label }] markers; face is front, back,
//               left, right or top, and x/y are percentages of that face
//   activePin   id of the highlighted marker
//   onPin       called with a marker's id when it is clicked
function PowerCube3D({ className = '', autoRotate = true, focus = null, pins = [], activePin = null, onPin }) {
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  const sheenRef = useRef(null);
  const shadowRef = useRef(null);
  const stateRef = useRef({ angle: START_ANGLE, tilt: START_TILT, vel: 0, dragging: false, lastX: 0, lastY: 0, lastT: 0, visible: true, auto: autoRotate, target: focus });
  const controlsRef = useRef({ start: () => {}, render: () => {}, reduced: false });
  const shades = {
    front: useRef(null),
    right: useRef(null),
    back: useRef(null),
    left: useRef(null),
    top: useRef(null),
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const s = stateRef.current;
    const sides = [
      ['front', 0], ['right', 90], ['back', 180], ['left', -90],
    ];

    const render = () => {
      cubeRef.current.style.transform = `rotateX(${s.tilt}deg) rotateY(${s.angle}deg)`;
      const rad = Math.PI / 180;
      for (const [name, base] of sides) {
        const a = (base + s.angle) * rad;
        const lit = Math.max(0, Math.sin(a) * LIGHT.x + Math.cos(a) * LIGHT.z);
        if (shades[name].current) shades[name].current.style.opacity = (0.62 - 0.56 * lit).toFixed(3);
      }
      if (shades.top.current) shades.top.current.style.opacity = (0.05 + Math.max(0, (s.tilt + 30) / 60) * 0.25).toFixed(3);
      // sheen sweeps across the front face as it turns
      const wrapped = ((s.angle % 360) + 540) % 360 - 180;
      if (sheenRef.current) sheenRef.current.style.backgroundPosition = `${50 + wrapped * 1.2}% 0`;
      // floor shadow follows the footprint
      const footprint = Math.abs(Math.cos(s.angle * rad)) * W + Math.abs(Math.sin(s.angle * rad)) * D;
      if (shadowRef.current) shadowRef.current.style.width = `${footprint * 1.05}em`;
    };

    let raf = 0;
    let prev = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!s.dragging) {
        if (s.target) {
          // ease along the shortest way round to the requested view
          const k = Math.min(1, dt * 4);
          const diff = ((((s.target.angle - s.angle) % 360) + 540) % 360) - 180;
          s.angle += diff * k;
          s.tilt += (s.target.tilt - s.tilt) * k;
          s.vel = 0;
        } else {
          if (s.auto && !reduced) s.angle += AUTO_SPEED * dt;
          s.angle += s.vel * dt;
          s.vel *= Math.pow(0.04, dt); // inertia fades out
          if (Math.abs(s.vel) < 1) s.vel = 0;
          s.tilt += (START_TILT - s.tilt) * Math.min(1, dt * 2); // ease back to resting tilt
        }
      }
      render();
      raf = s.visible ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!raf && s.visible) { prev = performance.now(); raf = requestAnimationFrame(tick); }
    };

    const onDown = (e) => {
      if (e.target.closest('[data-pin]')) return; // let marker clicks through
      s.dragging = true; s.vel = 0; s.target = null;
      s.lastX = e.clientX; s.lastY = e.clientY; s.lastT = performance.now();
      scene.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e) => {
      if (!s.dragging) return;
      const now = performance.now();
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.angle += dx * 0.5;
      s.tilt = Math.max(-55, Math.min(15, s.tilt - dy * 0.3));
      const dt = Math.max((now - s.lastT) / 1000, 0.001);
      s.vel = (dx * 0.5) / dt;
      s.lastX = e.clientX; s.lastY = e.clientY; s.lastT = now;
      if (reduced) render();
    };
    const onUp = () => {
      s.dragging = false;
      if (reduced) s.vel = 0;
    };

    // arrow keys turn the unit for keyboard users
    const onKey = (e) => {
      if (e.target !== scene) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        s.target = null;
        s.angle += e.key === 'ArrowLeft' ? -20 : 20;
        render();
      }
    };

    scene.addEventListener('pointerdown', onDown);
    scene.addEventListener('pointermove', onMove);
    scene.addEventListener('pointerup', onUp);
    scene.addEventListener('pointercancel', onUp);
    scene.addEventListener('keydown', onKey);

    // only animate while on screen
    const observer = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible && !reduced) start();
    });
    observer.observe(scene);

    controlsRef.current = { start, render, reduced };
    render();
    if (!reduced) start();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      scene.removeEventListener('pointerdown', onDown);
      scene.removeEventListener('pointermove', onMove);
      scene.removeEventListener('pointerup', onUp);
      scene.removeEventListener('pointercancel', onUp);
      scene.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    stateRef.current.auto = autoRotate;
  }, [autoRotate]);

  // turn to a requested view; with reduced motion, jump straight there
  useEffect(() => {
    const s = stateRef.current;
    const { start, render, reduced } = controlsRef.current;
    s.target = focus;
    if (focus && reduced) {
      s.angle = focus.angle; s.tilt = focus.tilt; s.target = null;
      render();
    } else {
      start();
    }
  }, [focus]);

  const pinsOn = (face) => pins
    .filter(pin => pin.face === face)
    .map(pin => <Pin key={`${pin.id}-${face}-${pin.x}-${pin.y}`} {...pin} active={activePin === pin.id} dimmed={activePin !== null && activePin !== pin.id} onPin={onPin} />);

  return (
    <div
      ref={sceneRef}
      tabIndex={0}
      role='group'
      aria-label='3D view of the VAAV PowerCube. Drag, or use the arrow keys, to turn it.'
      className={`flex cursor-grab touch-pan-y select-none items-center justify-center outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-brand-400/60 rounded-3xl ${className}`}
      style={{ perspective: '75em' }}
    >
      {/* floor shadow */}
      <div
        ref={shadowRef}
        className='pointer-events-none absolute left-1/2 h-[3.5em] -translate-x-1/2 rounded-[50%] bg-black/70 blur-[1.2em]'
        style={{ top: `calc(50% + ${H / 2 + 0.5}em)`, width: `${W}em` }}
        aria-hidden='true'
      />
      <div
        ref={cubeRef}
        className='relative [transform-style:preserve-3d]'
        style={{ width: `${W}em`, height: `${H}em`, transform: `rotateX(${START_TILT}deg) rotateY(${START_ANGLE}deg)` }}
      >
        <Front shadeRef={shades.front} sheenRef={sheenRef}>{pinsOn('front')}</Front>
        <Back shadeRef={shades.back}>{pinsOn('back')}</Back>
        <Right shadeRef={shades.right}>{pinsOn('right')}</Right>
        <Left shadeRef={shades.left}>{pinsOn('left')}</Left>
        <Top shadeRef={shades.top}>{pinsOn('top')}</Top>
        <Bottom />
      </div>
    </div>
  );
}

export default PowerCube3D
