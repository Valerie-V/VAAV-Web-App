import React from 'react'

// Building blocks for the CSS 3D product models. Every size is in em, so a
// model scales with the font size it is drawn at. Positions are measured from
// the centre of the unit's body: +x right, +y down, +z towards the viewer.

// Perforated vent pattern.
export function perforated(size = 0.48, dot = 0.13, color = 'rgba(0,0,0,0.85)') {
  return {
    backgroundImage: `radial-gradient(circle, ${color} ${dot}em, transparent ${dot + 0.02}em)`,
    backgroundSize: `${size}em ${size}em`,
  };
}

// Horizontal louvres / slots.
export function louvres(line = '#0a0a0a', gap = 'transparent', size = 0.45, thickness = 0.16, direction = 'to bottom') {
  return { backgroundImage: `repeating-linear-gradient(${direction}, ${line} 0 ${thickness}em, ${gap} ${thickness}em ${size}em)` };
}

// A flat panel placed in 3D space.
export function Part({ w, h, x = 0, y = 0, z = 0, rx = 0, ry = 0, className = '', style, children }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: `${w}em`,
        height: `${h}em`,
        left: `${-w / 2}em`,
        top: `${-h / 2}em`,
        transform: `translate3d(${x}em, ${y}em, ${z}em) rotateY(${ry}deg) rotateX(${rx}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// A solid block with fixed shading, for frames, stems, handles and feet.
export function Box({ w, h, d, x = 0, y = 0, z = 0, color = '#111', radius = 0 }) {
  const side = (a) => ({
    background: color,
    boxShadow: `inset 0 0 0 100em rgba(0,0,0,${a})`,
    borderRadius: radius ? `${radius}em` : undefined,
  });
  return (
    <>
      <Part w={w} h={h} x={x} y={y} z={z + d / 2} style={side(0.1)} />
      <Part w={w} h={h} x={x} y={y} z={z - d / 2} ry={180} style={side(0.35)} />
      <Part w={d} h={h} x={x + w / 2} y={y} z={z} ry={90} style={side(0.25)} />
      <Part w={d} h={h} x={x - w / 2} y={y} z={z} ry={-90} style={side(0.2)} />
      <Part w={w} h={d} x={x} y={y - h / 2} z={z} rx={90} style={side(0)} />
      <Part w={w} h={d} x={x} y={y + h / 2} z={z} rx={-90} style={side(0.5)} />
    </>
  );
}

// A wheel of radius r and thickness t. axis 'z' turns about a front-to-back
// axle (the wheel faces the front); axis 'x' faces the sides.
// Built from stacked discs plus two cross-sections, so it reads as solid from
// any angle.
export function Wheel({ r, t, x = 0, y = 0, z = 0, axis = 'z', hub = '#3b3f42', tire = '#0d0e0f', spokes = true }) {
  const ry = axis === 'z' ? 0 : 90;
  const at = (s) => (axis === 'z' ? { x, y, z: z + (s * t) / 2 } : { x: x + (s * t) / 2, y, z });
  const face = {
    borderRadius: '50%',
    background: [
      `radial-gradient(circle, transparent 0 56%, ${tire} 58% 100%)`,
      'radial-gradient(circle, #6a6f73 0 12%, transparent 13%)',
      spokes ? `repeating-conic-gradient(${hub} 0 22deg, #151617 22deg 32deg)` : hub,
    ].join(', '),
  };
  return (
    <>
      {[-1, -0.5, 0, 0.5, 1].map(s => (
        <Part key={s} w={2 * r} h={2 * r} {...at(s)} ry={ry} style={Math.abs(s) === 1 ? face : { borderRadius: '50%', background: tire }} />
      ))}
      {axis === 'z' ? (
        <>
          <Part w={t} h={2 * r} x={x} y={y} z={z} ry={90} style={{ background: tire }} />
          <Part w={2 * r} h={t} x={x} y={y} z={z} rx={90} style={{ background: tire }} />
        </>
      ) : (
        <>
          <Part w={t} h={2 * r} x={x} y={y} z={z} style={{ background: tire }} />
          <Part w={t} h={2 * r} x={x} y={y} z={z} rx={90} style={{ background: tire }} />
        </>
      )}
    </>
  );
}

// A castor: mounting plate, stem and a small wheel.
export function Castor({ x, z, top, r = 0.9, t = 0.7, color = '#2a2c2e', brake = false }) {
  return (
    <>
      <Box w={2} h={0.3} d={2} x={x} y={top + 0.15} z={z} color={color} />
      <Box w={0.55} h={r * 0.9} d={0.55} x={x} y={top + 0.3 + (r * 0.9) / 2} z={z} color={color} />
      <Wheel r={r} t={t} x={x} y={top + 0.3 + r * 0.9 + r * 0.55} z={z} axis='x' hub='#4a4e52' spokes={false} />
      {brake && <Box w={0.5} h={0.25} d={1.1} x={x} y={top + 0.6} z={z + 1.2} color='#b9bdc0' />}
    </>
  );
}

export function Screw({ style, size = 0.42 }) {
  return (
    <span
      className='absolute rounded-full'
      style={{ width: `${size}em`, height: `${size}em`, background: 'radial-gradient(circle at 35% 35%, #8b9094, #3b3f42 70%)', ...style }}
    />
  );
}

// A tiny printed label on a panel.
export function Label({ children, style, className = '' }) {
  return (
    <span className={`absolute whitespace-nowrap font-semibold uppercase leading-none tracking-wide ${className}`} style={{ fontSize: '0.36em', ...style }}>
      {children}
    </span>
  );
}

// A numbered marker that sits on a face of the model and turns with it.
export function Pin({ id, n, x, y, label, active, dimmed, onPin }) {
  return (
    <button
      type='button'
      data-pin
      onClick={() => onPin && onPin(id)}
      aria-label={`${n}. ${label}`}
      aria-pressed={active}
      className='absolute z-10 flex h-[max(1.5em,18px)] w-[max(1.5em,18px)] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center'
      style={{ left: x, top: y }}
    >
      {active && <span className='absolute inset-0 rounded-full bg-brand-400 animate-pulse-ring' aria-hidden='true' />}
      <span className={`relative flex h-full w-full items-center justify-center rounded-full text-[max(0.75em,10px)] font-bold shadow-[0_0.2em_0.6em_rgba(0,0,0,0.5)] ring-2 transition ${active ? 'scale-125 bg-white text-brand-700 ring-brand-400' : `bg-brand-600 text-white ring-white hover:bg-brand-500 ${dimmed ? 'opacity-60' : ''}`}`}>
        {n}
      </span>
    </button>
  );
}
