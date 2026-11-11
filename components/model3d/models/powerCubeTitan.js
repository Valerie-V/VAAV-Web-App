import React from 'react'
import { Castor, louvres } from '../parts'

// PowerCubeTitan: tall matte-black cabinet on four castors. A display band
// runs across the top of the front, with the rating printed on the right and
// a large "T" mark below; the sides have vent slots and the top two handles.

const body = '#1d1e20';
const W = 15;
const H = 27;
const D = 8;

const slots = louvres('#08090a', 'transparent', 0.42, 0.16, 'to right');

function SideVents() {
  return (
    <>
      <div className='absolute left-[22%] right-[22%] top-[20%] h-[20%]' style={slots} />
      <div className='absolute left-[22%] right-[22%] top-[74%] h-[14%]' style={slots} />
    </>
  );
}

function TopHandle({ side }) {
  return (
    <div className={`absolute bottom-[22%] top-[22%] w-[26%] rounded-[0.3em] p-[0.35em] ${side}`} style={{ background: 'linear-gradient(180deg, #9a9ea1, #6d7174)' }}>
      <div className='relative h-full w-full rounded-[0.2em] bg-[#0d0e0f]'>
        <span className='absolute inset-x-[12%] top-1/2 h-[28%] -translate-y-1/2 rounded-[0.15em] bg-[#a4a8ab]' />
      </div>
    </div>
  );
}

const powerCubeTitan = {
  name: 'PowerCubeTitan',
  W,
  H,
  D,
  c: 1.2,
  floor: 2.5,
  defaults: { battery: '5000', inverter: '5000' },
  skins: {
    body: { background: `linear-gradient(180deg, #232427, ${body} 40%, #19191b)` },
    corner: { background: 'linear-gradient(90deg, #151517, #2c2d30 50%, #151517)' },
    top: { background: '#242528' },
    bottom: { background: '#101112' },
  },
  faces: {
    front: (p) => (
      <>
        {/* display band */}
        <div className='absolute inset-x-0 top-0 h-[17%] bg-[#141517] shadow-[inset_0_-0.08em_0_rgba(255,255,255,0.06)]'>
          <div className='absolute left-[44%] top-[22%] flex gap-[0.35em]'>
            {['#4ade80', '#4ade80', '#4ade80'].map((c, i) => <span key={i} className='h-[0.3em] w-[0.3em] rounded-full' style={{ background: c, boxShadow: `0 0 0.3em ${c}` }} />)}
          </div>
          <div className='absolute left-[40%] top-[40%] h-[38%] w-[20%] rounded-[0.15em] bg-[#0a0c0e] ring-1 ring-white/10' style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 50%)' }} />
          <div className='absolute right-[6%] top-[24%] text-right font-bold leading-tight text-[#e6e7e8]'>
            <p className='text-[0.75em]'>{Number(p.inverter) / 1000}kW</p>
            <p className='text-[0.75em]'>{Number(p.battery) / 1000}kWh</p>
            <p className='mt-[0.3em] text-[0.3em] font-medium uppercase tracking-wide text-white/50'>Power station</p>
          </div>
        </div>

        {/* large T mark */}
        <div className='absolute left-[16%] top-[36%] h-[62%] w-[100%]' style={{ transform: 'skewX(-16deg)' }}>
          <span className='absolute left-0 right-0 top-0 h-[13%] bg-white/[0.06]' />
          <span className='absolute bottom-0 left-[20%] top-0 w-[30%] bg-white/[0.06]' />
          <span className='absolute left-[29%] top-[34%] h-[30%] w-[12%] bg-black/30' style={{ clipPath: 'polygon(55% 0, 100% 0, 60% 45%, 95% 45%, 15% 100%, 40% 55%, 5% 55%)' }} />
        </div>
      </>
    ),
    left: () => <SideVents />,
    right: () => <SideVents />,
    top: () => (
      <>
        <TopHandle side='left-[7%]' />
        <TopHandle side='right-[7%]' />
      </>
    ),
  },

  extras: () => {
    const top = H / 2;
    const x = W / 2 - 1.6;
    const z = D / 2 - 1.5;
    return (
      <>
        <Castor x={-x} z={z} top={top} />
        <Castor x={x} z={z} top={top} />
        <Castor x={-x} z={-z} top={top} />
        <Castor x={x} z={-z} top={top} />
      </>
    );
  },

  features: () => [
    { id: 'display', title: 'Display and status lights', text: 'Shows the battery level and system status, with status lights above.', view: { angle: -10, tilt: -12 }, pins: [{ face: 'front', x: '36%', y: '9%' }] },
    { id: 'handles', title: 'Carry handles', text: 'Two handles on top for lifting it into place.', view: { angle: -20, tilt: -50 }, pins: [{ face: 'top', x: '20%', y: '50%' }, { face: 'top', x: '80%', y: '50%' }] },
    { id: 'vents', title: 'Cooling vents', text: 'Vent slots on both sides let heat out.', view: { angle: 62, tilt: -10 }, pins: [{ face: 'left', x: '50%', y: '30%' }, { face: 'left', x: '50%', y: '81%' }, { face: 'right', x: '50%', y: '30%' }, { face: 'right', x: '50%', y: '81%' }] },
    { id: 'castors', title: 'Castor wheels', text: 'Four castors so it rolls into place.', view: { angle: -26, tilt: 6 }, pins: [{ face: 'front', x: '9%', y: '96%' }, { face: 'front', x: '91%', y: '96%' }] },
  ],
};

export default powerCubeTitan
