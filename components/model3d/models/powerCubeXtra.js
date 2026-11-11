import React from 'react'
import { Box, Label, Screw, Wheel, perforated } from '../parts'

// PowerCubeXtra: charcoal case on a trolley base with two wheels. The front
// has the display, buttons, green port plates and a green triangle pattern;
// the white right side has AC sockets, the AC input and a fold-out handle.

const charcoal = '#2b2f32';
const white = '#f1f1ef';
const green = '#74c446';

function Plate({ left, top, children, label }) {
  return (
    <div className='absolute flex h-[8%] w-[14%] flex-col items-center justify-center gap-[0.25em] rounded-[0.15em]' style={{ left, top, background: green, boxShadow: 'inset -0.35em 0 0 rgba(0,0,0,0.12)' }}>
      <div className='flex items-center gap-[0.6em]'>{children}</div>
      <span className='text-[0.34em] font-bold uppercase tracking-wide text-[#1f3b12]'>{label}</span>
    </div>
  );
}

const usbA = <span className='h-[0.4em] w-[0.85em] rounded-[0.06em] bg-[#1d2a17] shadow-[inset_0_0_0_0.08em_#e8e8e8]' />;
const dcJack = <span className='h-[0.6em] w-[0.6em] rounded-full bg-[#1d2a17] shadow-[inset_0_0_0_0.12em_#eaeaea]' />;
const usbC = <span className='h-[0.26em] w-[0.7em] rounded-full bg-[#1d2a17]' />;

function SideSocket({ left, top }) {
  return (
    <span className='absolute flex h-[14%] w-[22%] items-center justify-center rounded-[0.35em] bg-[#26292c]' style={{ left, top }}>
      <span className='flex h-[2em] w-[2em] items-center justify-center gap-[0.4em] rounded-full bg-[#34383b] shadow-[inset_0_0.15em_0.3em_rgba(0,0,0,0.7)]'>
        <span className='h-[0.3em] w-[0.3em] rounded-full bg-black' />
        <span className='h-[0.3em] w-[0.3em] rounded-full bg-black' />
      </span>
    </span>
  );
}

const screwsFront = [['1.5%', '4%'], ['98.5%', '4%'], ['1.5%', '50%'], ['98.5%', '50%'], ['1.5%', '96%'], ['98.5%', '96%'], ['60%', '96%']];

const powerCubeXtra = {
  name: 'PowerCubeXtra',
  W: 24,
  H: 19,
  D: 14,
  c: 0.5,
  floor: 4,
  defaults: { battery: '5000', inverter: '3500' },
  skins: {
    body: { background: charcoal },
    left: { background: white },
    right: { background: white },
    corner: { background: '#cfd0ce' },
    top: { background: '#34383b' },
    bottom: { background: '#151617' },
  },
  faces: {
    front: (p) => (
      <>
        {screwsFront.map(([left, top]) => <Screw key={left + top} size={0.36} style={{ left, top, transform: 'translate(-50%, -50%)' }} />)}

        {/* display */}
        <div className='absolute bottom-[64%] left-[29%] right-[38%] top-[18%] rounded-[1em] bg-[#17191b] p-[0.55em] shadow-[0_0_0_0.1em_rgba(255,255,255,0.06)]'>
          <div className='h-full w-full rounded-[0.35em] bg-[#0b0c0d]' style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 45%)' }} />
        </div>

        {/* power button */}
        <span className='absolute left-[17%] top-[22%] h-[0.9em] w-[0.9em] rounded-[0.15em] border-[0.12em] border-[#74c446]' />
        <span className='absolute left-[21%] top-[22.3%] h-[0.65em] w-[1.5em] rounded-full bg-[#17191b]' />

        {/* AC and light buttons */}
        <span className='absolute left-[65%] top-[22.3%] h-[0.65em] w-[1.5em] rounded-full bg-[#17191b]' />
        <span className='absolute left-[72%] top-[21.6%] text-[0.75em] font-black text-[#74c446]'>AC</span>
        <span className='absolute left-[65%] top-[29%] h-[0.65em] w-[1.5em] rounded-full bg-[#17191b]' />
        <span className='absolute left-[72.4%] top-[28.6%] h-[0.7em] w-[0.7em] rounded-full border-[0.12em] border-[#74c446]' />

        {/* wordmark */}
        <div className='absolute left-[2%] top-[49%] leading-none text-white'>
          <p className='text-[1.9em] font-medium tracking-tight'>VAAV</p>
          <p className='text-[1.9em] font-black tracking-tight' style={{ color: green }}>{p.inverter}W</p>
          <p className='mt-[0.4em] text-[0.44em] font-bold uppercase'>Portable power station</p>
        </div>

        {/* port plates */}
        <Plate left='33%' top='58%' label='USB out'>{usbA}{usbA}</Plate>
        <Plate left='51%' top='58%' label='USB out'>{usbA}{usbA}</Plate>
        <Plate left='33%' top='68%' label='DC out'>{dcJack}{dcJack}</Plate>
        <Plate left='51%' top='68%' label='Type-C out'>{usbC}{usbC}</Plate>

        {/* USB-C and car socket buttons */}
        <span className='absolute left-[76%] top-[59.5%] h-[0.65em] w-[1.5em] rounded-full bg-[#17191b]' />
        <Label className='text-[#74c446]' style={{ left: '83%', top: '59.7%' }}>USB TYPE-C</Label>
        <span className='absolute left-[76%] top-[67.5%] h-[0.65em] w-[1.5em] rounded-full bg-[#17191b]' />
        <Label className='text-[#74c446]' style={{ left: '83%', top: '67.7%' }}>DC CIG</Label>

        {/* green triangle pattern */}
        <div
          className='absolute inset-x-0 bottom-[3%] top-[77%]'
          style={{
            backgroundImage: `conic-gradient(from 150deg at 50% 8%, ${green} 0 60deg, transparent 60deg)`,
            backgroundSize: '0.75em 0.65em',
            WebkitMaskImage: 'linear-gradient(to top, black 35%, transparent)',
            maskImage: 'linear-gradient(to top, black 35%, transparent)',
          }}
        />
      </>
    ),

    // on this face the left edge meets the front
    right: () => (
      <>
        <div className='absolute left-[8%] right-[8%] top-[3%] h-[14%]' style={perforated(0.42, 0.11, '#4b4f52')} />
        {/* fold-out handle */}
        <div className='absolute left-[28%] right-[28%] top-[24%] h-[18%] rounded-[0.3em] shadow-[inset_0_0_0_0.08em_rgba(0,0,0,0.2)]' style={{ background: 'linear-gradient(180deg, #d3d6d8, #9fa4a7)' }}>
          <span className='absolute inset-x-[18%] top-[30%] h-[30%] rounded-[0.3em] border-[0.3em] border-[#2a2c2e]' />
        </div>
        {/* AC input and breaker */}
        <span className='absolute left-[22%] top-[51%] h-[1em] w-[1em] -translate-x-1/2 rounded-full' style={{ background: 'radial-gradient(circle at 35% 35%, #e5e7e8, #8b9094 70%)' }} />
        <span className='absolute left-[14%] top-[57%] flex h-[6%] w-[17%] items-center justify-center rounded-[0.15em] bg-[#121314]'>
          <span className='h-[45%] w-[60%] rounded-[0.1em] bg-[#2a2d30]' />
        </span>
        <Label className='text-[#555]' style={{ left: '14%', top: '64.5%' }}>AC IN</Label>
        <SideSocket left='56%' top='50%' />
        <SideSocket left='14%' top='70%' />
        <SideSocket left='56%' top='70%' />
        <Label className='text-[#555]' style={{ left: '56%', top: '85.5%' }}>AC OUT</Label>
        {[['4%', '4%'], ['96%', '4%'], ['4%', '96%'], ['96%', '96%']].map(([left, top]) => <Screw key={left + top} size={0.34} style={{ left, top, transform: 'translate(-50%, -50%)' }} />)}
      </>
    ),

    left: () => (
      <>
        <div className='absolute left-[8%] right-[8%] top-[3%] h-[14%]' style={perforated(0.42, 0.11, '#4b4f52')} />
        {[['4%', '4%'], ['96%', '4%'], ['4%', '96%'], ['96%', '96%']].map(([left, top]) => <Screw key={left + top} size={0.34} style={{ left, top, transform: 'translate(-50%, -50%)' }} />)}
      </>
    ),

    back: () => (
      <>
        {[['2%', '4%'], ['98%', '4%'], ['2%', '96%'], ['98%', '96%']].map(([left, top]) => <Screw key={left + top} size={0.36} style={{ left, top, transform: 'translate(-50%, -50%)' }} />)}
      </>
    ),
  },

  // trolley base: rails, two wheels at the left end, feet at the right end
  extras: () => {
    const base = 19 / 2;
    const W = 24;
    const D = 14;
    const wheelX = -W / 2 + 2.6;
    return (
      <>
        <Box w={W - 2} h={1.4} d={1} x={0.4} y={base + 0.7} z={D / 2 - 0.6} color='#161718' />
        <Box w={W - 2} h={1.4} d={1} x={0.4} y={base + 0.7} z={-D / 2 + 0.6} color='#161718' />
        <Box w={0.7} h={0.7} d={D + 2.4} x={wheelX} y={base + 1.2} z={0} color='#111' />
        <Wheel r={2.8} t={1.6} x={wheelX} y={base + 1.2} z={D / 2 + 0.9} axis='z' />
        <Wheel r={2.8} t={1.6} x={wheelX} y={base + 1.2} z={-D / 2 - 0.9} axis='z' />
        <Box w={1.6} h={4} d={1.2} x={W / 2 - 1.6} y={base + 2} z={D / 2 - 1.2} color='#1b1c1d' />
        <Box w={1.6} h={4} d={1.2} x={W / 2 - 1.6} y={base + 2} z={-D / 2 + 1.2} color='#1b1c1d' />
        <Box w={1.6} h={0.8} d={D - 1.2} x={W / 2 - 1.6} y={base + 3.6} z={0} color='#1b1c1d' />
      </>
    );
  },

  features: (p) => {
    const output = Number(p.inverter).toLocaleString();
    return [
      { id: 'display', title: 'Display', text: 'Shows the battery level and power in and out at a glance.', view: { angle: -10, tilt: -8 }, pins: [{ face: 'front', x: '63%', y: '17%' }] },
      { id: 'power', title: 'Power button', text: 'Turns the PowerCubeXtra on and off.', view: { angle: -10, tilt: -8 }, pins: [{ face: 'front', x: '14%', y: '24%' }] },
      { id: 'buttons', title: 'AC and light buttons', text: 'Switch the AC sockets and the built-in light on and off.', view: { angle: -16, tilt: -8 }, pins: [{ face: 'front', x: '80%', y: '26%' }] },
      { id: 'outputs', title: 'USB, USB-C and DC outputs', text: 'For phones, laptops, routers and other small devices, each group with its own button.', view: { angle: -8, tilt: -6 }, pins: [{ face: 'front', x: '49%', y: '67%' }] },
      { id: 'ac', title: 'AC sockets', text: `Three AC sockets on the side, up to ${output}W in total.`, view: { angle: -62, tilt: -10 }, pins: [{ face: 'right', x: '80%', y: '50%' }] },
      { id: 'input', title: 'AC input', text: 'Plug in to the grid to charge, with a breaker to protect it.', view: { angle: -62, tilt: -10 }, pins: [{ face: 'right', x: '9%', y: '61%' }] },
      { id: 'handle', title: 'Fold-out handle', text: 'A handle on the side for lifting.', view: { angle: -62, tilt: -16 }, pins: [{ face: 'right', x: '75%', y: '25%' }] },
      { id: 'wheels', title: 'Wheels and trolley base', text: 'Built-in wheels and a trolley base make it easy to move.', view: { angle: -26, tilt: -2 }, pins: [{ face: 'front', x: '5%', y: '92%' }] },
      { id: 'vents', title: 'Cooling vents', text: 'Perforated vents near the top of each side let heat out.', view: { angle: 52, tilt: -28 }, pins: [{ face: 'left', x: '50%', y: '10%' }, { face: 'right', x: '50%', y: '10%' }] },
    ];
  },
};

export default powerCubeXtra
