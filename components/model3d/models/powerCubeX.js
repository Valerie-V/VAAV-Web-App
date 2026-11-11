import React from 'react'
import { Label, louvres } from '../parts'

// PowerCubeX: rounded, rubberised grey shell. The front carries a light control
// panel (DC block, display, PV input, USB row and four AC sockets); the top has
// handle recesses at each end; the sides have louvred vent panels.

const rubber = {
  backgroundColor: '#3f4245',
  backgroundImage: [
    'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 0.1em, transparent 0.1em 0.28em)',
    'repeating-linear-gradient(-45deg, rgba(0,0,0,0.18) 0 0.1em, transparent 0.1em 0.28em)',
  ].join(', '),
};

const roundedCorner = {
  ...rubber,
  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.3), rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.3)), ${rubber.backgroundImage}`,
};

const panel = '#dad9d3';
const ink = '#3a3d40';

function Pill({ style, led = true }) {
  return (
    <span className='absolute flex h-[0.55em] w-[1.3em] -translate-x-1/2 items-center justify-center rounded-full bg-[#2b2d2f]' style={style}>
      {led && <span className='h-[0.22em] w-[0.22em] rounded-full bg-[#4ade80] shadow-[0_0_0.3em_#4ade80]' />}
    </span>
  );
}

function AcSocket() {
  return (
    <span className='relative flex aspect-square h-full items-center justify-center rounded-[0.25em] bg-[#202224] shadow-[inset_0_0_0_0.1em_rgba(0,0,0,0.6)]'>
      <span className='flex h-[78%] w-[78%] items-center justify-center gap-[0.35em] rounded-full bg-[#2c2f31] shadow-[inset_0_0.15em_0.3em_rgba(0,0,0,0.7)]'>
        <span className='h-[0.32em] w-[0.32em] rounded-full bg-black' />
        <span className='h-[0.32em] w-[0.32em] rounded-full bg-black' />
      </span>
    </span>
  );
}

function SidePanel() {
  return (
    <div className='absolute bottom-[10%] left-[10%] right-[10%] top-[12%] rounded-[0.8em] shadow-[inset_0_0_0_0.1em_rgba(0,0,0,0.15)]' style={{ background: '#d3d2cc' }}>
      <div className='absolute left-[10%] right-[10%] top-[8%] h-[45%]' style={louvres('#8f908c', 'transparent', 0.55, 0.2)} />
      <div className='absolute inset-x-[6%] top-[62%] h-[0.08em] bg-black/15' />
      <div className='absolute bottom-[6%] left-1/2 h-[0.6em] w-[3em] -translate-x-1/2 rounded-full bg-black/20' />
    </div>
  );
}

const powerCubeX = {
  name: 'PowerCubeX',
  W: 24,
  H: 15.4,
  D: 16.5,
  c: 2.6,
  defaults: { battery: '2400', inverter: '2000' },
  skins: {
    body: rubber,
    corner: roundedCorner,
    top: { background: 'linear-gradient(180deg, #6c6f72, #85888b 40%, #686b6e)' },
    bottom: { background: '#1f2123' },
  },
  faces: {
    front: (p) => (
      <>
        {/* VAAV badge */}
        <span className='absolute left-1/2 top-[7%] flex h-[9%] w-[4em] -translate-x-1/2 items-center justify-center rounded-[0.15em] bg-[#232527] text-[0.95em] font-bold tracking-[0.08em] text-white'>VAAV</span>

        {/* control panel */}
        <div className='absolute bottom-[4%] left-[9%] right-[9%] top-[25%] rounded-[0.7em] shadow-[inset_0_0_0_0.12em_rgba(0,0,0,0.12)]' style={{ background: panel, color: ink }}>
          {/* DC block */}
          <div className='absolute left-[3%] top-[6%] h-[44%] w-[20%] rounded-[0.4em] ring-1 ring-black/20'>
            <Pill style={{ left: '50%', top: '5%' }} />
            <Label style={{ left: '50%', top: '19%', transform: 'translateX(-50%)' }}>DC</Label>
            <Label style={{ left: '50%', top: '31%', transform: 'translateX(-50%)' }}>CIG OUT</Label>
            <span className='absolute left-1/2 top-[40%] h-[1.7em] w-[1.7em] -translate-x-1/2 rounded-full' style={{ background: 'radial-gradient(circle, #0b0c0d 0 30%, #1d1f21 34% 70%, #3a3d40 74%)' }} />
            <span className='absolute bottom-[6%] left-[28%] h-[0.45em] w-[0.45em] rounded-full bg-[#1d1f21]' />
            <span className='absolute bottom-[6%] right-[28%] h-[0.45em] w-[0.45em] rounded-full bg-[#1d1f21]' />
          </div>

          {/* power button */}
          <Pill style={{ left: '42%', top: '5%' }} />
          <Label style={{ left: '47%', top: '6.5%' }}>ON/OFF</Label>

          {/* display */}
          <div className='absolute bottom-[54%] left-[30%] right-[34%] top-[15%] rounded-[0.25em] bg-[#0d0e0f]' style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 40%)' }} />

          {/* PV input block */}
          <div className='absolute left-[76%] right-[3%] top-[5%] h-[40%] rounded-[0.4em] ring-1 ring-black/20'>
            <span className='absolute left-1/2 top-[8%] h-[0.5em] w-[1.6em] -translate-x-1/2 rounded-full ring-1 ring-black/25' />
            <Label style={{ left: '50%', top: '26%', transform: 'translateX(-50%)' }}>IN PUT</Label>
            <Label style={{ left: '50%', top: '44%', transform: 'translateX(-50%)' }}>PV IN</Label>
            <span className='absolute left-1/2 top-[58%] flex h-[0.8em] w-[1.4em] -translate-x-1/2 items-center justify-center gap-[0.2em] rounded-[0.12em] bg-[#e5b300]'>
              <span className='h-[0.28em] w-[0.28em] rounded-full bg-[#5a4600]' />
              <span className='h-[0.28em] w-[0.28em] rounded-full bg-[#5a4600]' />
            </span>
          </div>

          {/* USB row */}
          <div className='absolute left-[27%] right-[29%] top-[57%] flex items-center justify-between'>
            {['a', 'a', 'a', 'a', 'c', 'c'].map((type, i) => (
              <span key={i} className={`rounded-[0.1em] bg-[#2b2d2f] ${type === 'a' ? 'h-[0.38em] w-[0.85em]' : 'h-[0.28em] w-[0.6em] rounded-full'}`} />
            ))}
          </div>
          <Label style={{ left: '27%', top: '52%' }}>USB OUT</Label>
          <Label style={{ left: '43%', top: '52%' }}>USB OUT</Label>
          <Label style={{ left: '59%', top: '52%' }}>TYPE-C OUT</Label>

          {/* AC button */}
          <Pill style={{ left: '50%', top: '63%' }} />
          <Label style={{ left: '50%', top: '68.5%', transform: 'translateX(-50%)' }}>AC</Label>

          {/* AC sockets */}
          <div className='absolute bottom-[8%] left-[6%] right-[6%] top-[73%] flex justify-between'>
            <AcSocket /><AcSocket /><AcSocket /><AcSocket />
          </div>
          <Label style={{ left: '50%', bottom: '2%', transform: 'translateX(-50%)' }}>Max {p.inverter}W</Label>
        </div>
      </>
    ),
    left: () => <SidePanel />,
    right: () => <SidePanel />,
    back: () => <div className='absolute inset-[10%] rounded-[0.8em] shadow-[inset_0_0_0_0.1em_rgba(255,255,255,0.05)]' />,
    top: () => (
      <div className='absolute inset-[1.1em] rounded-[1.4em] shadow-[0_0_0_1.4em_#3f4245]'>
        {/* handle recesses */}
        {['left-[0.6em]', 'right-[0.6em]'].map(side => (
          <span key={side} className={`absolute bottom-[20%] top-[20%] w-[2.4em] rounded-full bg-[#cfd0cc] shadow-[inset_0_0.35em_0.5em_rgba(0,0,0,0.35)] ${side}`} />
        ))}
      </div>
    ),
  },

  features: (p) => [
    { id: 'display', title: 'Display', text: 'Shows the battery level and how much power is going in and out.', view: { angle: -12, tilt: -10 }, pins: [{ face: 'front', x: '64%', y: '34%' }] },
    { id: 'power', title: 'Power button', text: 'Turns the PowerCubeX on and off.', view: { angle: -12, tilt: -10 }, pins: [{ face: 'front', x: '37.5%', y: '29%' }] },
    { id: 'ac', title: 'AC sockets', text: `Four AC sockets, up to ${Number(p.inverter).toLocaleString()}W in total, with their own AC button.`, view: { angle: -10, tilt: -6 }, pins: [{ face: 'front', x: '50%', y: '86%' }] },
    { id: 'usb', title: 'USB ports', text: 'USB-A and USB-C ports for phones, tablets and laptops.', view: { angle: -12, tilt: -8 }, pins: [{ face: 'front', x: '28.5%', y: '66%' }] },
    { id: 'dc', title: 'Car socket and DC outputs', text: 'A car-style socket and DC outputs, switched with the DC button.', view: { angle: 14, tilt: -8 }, pins: [{ face: 'front', x: '9.5%', y: '45%' }] },
    { id: 'pv', title: 'Solar input', text: 'Plug solar panels into the PV input to charge from the sun.', view: { angle: -26, tilt: -8 }, pins: [{ face: 'front', x: '80%', y: '57%' }] },
    { id: 'handles', title: 'Carry handles', text: 'Handles built into both ends of the top for lifting.', view: { angle: -20, tilt: -50 }, pins: [{ face: 'top', x: '8%', y: '50%' }, { face: 'top', x: '92%', y: '50%' }] },
    { id: 'vents', title: 'Cooling vents', text: 'Louvred side panels let heat out while it works.', view: { angle: 58, tilt: -14 }, pins: [{ face: 'left', x: '50%', y: '30%' }, { face: 'right', x: '50%', y: '30%' }] },
  ],
};

export default powerCubeX
