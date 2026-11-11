'use client'
import React, { useEffect, useRef } from 'react'
import { Part, Pin } from './parts'
import { getModel } from './models'

// Renders a product model (see ./models) in CSS 3D. It turns slowly on its own
// and can be spun by dragging or with the arrow keys. Pass a position class
// (relative or absolute) in className; the font size sets the overall scale.
//
// Props:
//   model       model key, e.g. 'powercube' (see ./models/index.js)
//   product     product data, used for figures printed on the unit
//   autoRotate  turn slowly on its own (default true)
//   focus       { angle, tilt } to turn to and hold; null to release
//   pins        [{ id, n, face, x, y, label }] markers; face is front, back,
//               left, right, top or a corner (fl, fr, bl, br), and x/y are
//               percentages of that face
//   activePin   id of the highlighted marker
//   onPin       called with a marker's id when it is clicked

const AUTO_SPEED = 22;   // degrees per second
const START_ANGLE = -32;
const START_TILT = -14;
const LIGHT = { x: -0.55, z: 0.84 }; // light comes from the front-left
const REFERENCE = 21;    // models are scaled so their largest extent is about this many em

const edge = { boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0.6em rgba(0,0,0,0.45)' };

// The body is a box, or an octagonal prism when the model has bevelled
// vertical corners (c > 0).
function faceSpecs({ W, H, D, c = 0 }) {
  const seam = 0.04; // tiny overlap so no hairline gaps show between faces
  const faces = [
    { key: 'front', w: W - 2 * c + seam, h: H, z: D / 2, ry: 0, yaw: 0 },
    { key: 'right', w: D - 2 * c + seam, h: H, x: W / 2, ry: 90, yaw: 90 },
    { key: 'back', w: W - 2 * c + seam, h: H, z: -D / 2, ry: 180, yaw: 180 },
    { key: 'left', w: D - 2 * c + seam, h: H, x: -W / 2, ry: -90, yaw: -90 },
  ];
  if (c > 0) {
    const cx = W / 2 - c / 2;
    const cz = D / 2 - c / 2;
    const w = c * Math.SQRT2 + seam;
    faces.push(
      { key: 'fr', w, h: H, x: cx, z: cz, ry: 45, yaw: 45, corner: true },
      { key: 'br', w, h: H, x: cx, z: -cz, ry: 135, yaw: 135, corner: true },
      { key: 'bl', w, h: H, x: -cx, z: -cz, ry: -135, yaw: -135, corner: true },
      { key: 'fl', w, h: H, x: -cx, z: cz, ry: -45, yaw: -45, corner: true },
    );
  }
  const px = (c / W) * 100;
  const pz = (c / D) * 100;
  const octagon = c > 0
    ? `polygon(${px}% 0, ${100 - px}% 0, 100% ${pz}%, 100% ${100 - pz}%, ${100 - px}% 100%, ${px}% 100%, 0 ${100 - pz}%, 0 ${pz}%)`
    : undefined;
  faces.push(
    { key: 'top', w: W + seam, h: D + seam, y: -H / 2, rx: 90, clip: octagon },
    { key: 'bottom', w: W + seam, h: D + seam, y: H / 2, rx: -90, clip: octagon },
  );
  return faces;
}

function Model3D({ model: modelKey = 'powercube', product, className = '', autoRotate = true, focus = null, pins = [], activePin = null, onPin }) {
  const model = getModel(modelKey);
  const { W, H, D, floor = 0 } = model;
  const scale = REFERENCE / Math.max(Math.hypot(W, D) * 0.85, H + floor);
  const faces = faceSpecs(model);

  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  const sheenRef = useRef(null);
  const shadeRefs = useRef({});
  const stateRef = useRef({ angle: START_ANGLE, tilt: START_TILT, vel: 0, dragging: false, lastX: 0, lastY: 0, lastT: 0, visible: true, auto: autoRotate, target: focus });
  const controlsRef = useRef({ start: () => {}, render: () => {}, reduced: false });
  const geometryRef = useRef({ W, D, faces });
  geometryRef.current = { W, D, faces };

  useEffect(() => {
    const scene = sceneRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const s = stateRef.current;

    const render = () => {
      const { faces: list } = geometryRef.current;
      cubeRef.current.style.transform = `rotateX(${s.tilt}deg) rotateY(${s.angle}deg)`;
      const rad = Math.PI / 180;
      for (const face of list) {
        const el = shadeRefs.current[face.key];
        if (!el) continue;
        if (face.key === 'top') {
          el.style.opacity = (0.05 + Math.max(0, (s.tilt + 30) / 60) * 0.25).toFixed(3);
        } else if (face.yaw !== undefined) {
          const a = (face.yaw + s.angle) * rad;
          const lit = Math.max(0, Math.sin(a) * LIGHT.x + Math.cos(a) * LIGHT.z);
          el.style.opacity = (0.62 - 0.56 * lit).toFixed(3);
        }
      }
      // sheen sweeps across the front as it turns
      const wrapped = ((s.angle % 360) + 540) % 360 - 180;
      if (sheenRef.current) sheenRef.current.style.backgroundPosition = `${50 + wrapped * 1.2}% 0`;
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

  // switching models re-shades straight away
  useEffect(() => {
    controlsRef.current.render();
  }, [modelKey]);

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

  const data = { ...model.defaults, ...product };

  return (
    <div
      ref={sceneRef}
      tabIndex={0}
      role='group'
      aria-label={`3D view of the VAAV ${model.name}. Drag, or use the arrow keys, to turn it.`}
      className={`flex cursor-grab touch-pan-y select-none items-center justify-center rounded-3xl outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-brand-400/60 ${className}`}
    >
      <div
        className='relative shrink-0'
        style={{ width: `${W}em`, height: `${H}em`, fontSize: `${scale}em`, top: `${-floor / 2}em`, perspective: '75em' }}
      >
        <div
          ref={cubeRef}
          className='absolute inset-0 [transform-style:preserve-3d]'
          style={{ transform: `rotateX(${START_TILT}deg) rotateY(${START_ANGLE}deg)` }}
        >
          <div className='absolute left-1/2 top-1/2 [transform-style:preserve-3d]'>
            {/* soft shadow on the floor, which tilts and turns with the unit */}
            <Part
              w={W + 5}
              h={D + 5}
              y={H / 2 + floor + 0.05}
              rx={90}
              className='pointer-events-none'
              style={{ background: 'radial-gradient(closest-side, rgba(0,0,0,0.5), rgba(0,0,0,0.22) 55%, transparent)' }}
            />
            {faces.map(face => {
              const skin = model.skins[face.key] || (face.corner ? model.skins.corner : null) || model.skins.body;
              const content = model.faces[face.key];
              return (
                <Part
                  key={face.key}
                  w={face.w}
                  h={face.h}
                  x={face.x}
                  y={face.y}
                  z={face.z}
                  rx={face.rx}
                  ry={face.ry}
                  className='overflow-hidden [backface-visibility:hidden]'
                  style={{ ...(face.corner || face.key === 'bottom' ? null : edge), ...skin, clipPath: face.clip }}
                >
                  {content && content(data)}
                  {face.key === 'front' && (
                    <div
                      ref={sheenRef}
                      className='pointer-events-none absolute inset-0'
                      style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.09) 50%, transparent 65%)', backgroundSize: '300% 100%' }}
                    />
                  )}
                  {face.key !== 'bottom' && (
                    <div
                      ref={el => { shadeRefs.current[face.key] = el; }}
                      className='pointer-events-none absolute inset-0 bg-black'
                      style={{ opacity: face.key === 'top' ? 0.05 : 0.3 }}
                    />
                  )}
                  {pins.filter(pin => pin.face === face.key).map(pin => (
                    <Pin key={`${pin.id}-${pin.x}-${pin.y}`} {...pin} active={activePin === pin.id} dimmed={activePin !== null && activePin !== pin.id} onPin={onPin} />
                  ))}
                </Part>
              );
            })}
            {model.extras && model.extras(data)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model3D
