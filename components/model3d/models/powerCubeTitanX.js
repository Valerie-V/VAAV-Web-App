import React from 'react'
import { Castor, Label, Screw } from '../parts'

// PowerCubeTitanX: cream steel cabinet with aluminium corner trims, a navy top
// band and a dark lower panel, on four castors. The front carries the smart
// battery display and the inverter control panel.

const W = 22;
const H = 27;
const D = 14;
const cream = '#e9e7e0';

function Bands() {
  return (
    <>
      <div className='absolute inset-x-0 top-0 h-[9%]' style={{ background: 'linear-gradient(180deg, #2a4f96, #1a3670 70%, #142b5a)' }}>
        <div className='absolute inset-x-0 top-[18%] h-[12%] bg-white/10' />
      </div>
      <div className='absolute inset-x-0 bottom-0 top-[77%] bg-[#3a3d41] shadow-[inset_0_0.1em_0_rgba(255,255,255,0.08)]'>
        {['8%', '30%', '50%', '70%', '92%'].map(left => (
          <Screw key={left} size={0.34} style={{ left, top: '6%', transform: 'translateX(-50%)' }} />
        ))}
        {['8%', '50%', '92%'].map(left => (
          <Screw key={left} size={0.34} style={{ left, bottom: '6%', transform: 'translateX(-50%)' }} />
        ))}
      </div>
    </>
  );
}

const powerCubeTitanX = {
  name: 'PowerCubeTitanX',
  W,
  H,
  D,
  c: 0.9,
  floor: 3.5,
  defaults: { battery: '10000', inverter: '5000' },
  skins: {
    body: { background: cream },
    corner: { background: 'linear-gradient(90deg, #858a8d, #dfe2e4 50%, #858a8d)' },
    top: { background: '#d6d4cd' },
    bottom: { background: '#2a2c2e' },
  },
  faces: {
    front: () => (
      <>
        <Bands />

        {/* smart battery display */}
        <div className='absolute left-[18%] top-[25%] h-[11%] w-[23%] rounded-[0.3em] bg-[#1d1f21] p-[0.3em] shadow-[0_0.2em_0.4em_rgba(0,0,0,0.25)]'>
          <div className='relative flex h-[82%] w-full items-center gap-[0.4em] rounded-[0.15em] bg-[#050607] px-[0.4em]'>
            <span className='flex aspect-square h-[78%] items-center justify-center rounded-full border-[0.2em] border-[#3ddc6a]'>
              <span className='text-[0.4em] font-bold text-white'>100%</span>
            </span>
            <span className='flex flex-1 flex-col gap-[0.25em]'>
              <span className='h-[0.16em] w-[70%] bg-white/50' />
              <span className='h-[0.16em] w-[55%] bg-white/50' />
              <span className='h-[0.16em] w-[65%] bg-white/50' />
            </span>
          </div>
          <Label className='text-white/40' style={{ left: '50%', bottom: '4%', transform: 'translateX(-50%)', fontSize: '0.24em' }}>Smart battery LCD</Label>
        </div>

        {/* inverter control panel */}
        <div className='absolute left-[61%] top-[20%] h-[23%] w-[26%] rounded-[0.2em] bg-[#111829] shadow-[0_0.2em_0.4em_rgba(0,0,0,0.3)]'>
          {[['6%', '4%'], ['94%', '4%'], ['6%', '96%'], ['94%', '96%']].map(([left, top]) => (
            <Screw key={left + top} size={0.3} style={{ left, top, transform: 'translate(-50%, -50%)' }} />
          ))}
          <div className='absolute inset-x-[20%] top-[9%] flex justify-between'>
            {['#3ddc6a', '#5b6475', '#3ddc6a', '#7a2a2a'].map((c, i) => (
              <span key={i} className='h-[0.32em] w-[0.32em] rounded-full' style={{ background: c, boxShadow: c === '#3ddc6a' ? `0 0 0.3em ${c}` : undefined }} />
            ))}
          </div>
          <div className='absolute inset-x-[16%] top-[30%] h-[30%] rounded-[0.1em]' style={{ background: 'linear-gradient(180deg, #4b95ff, #2a6fe0)' }}>
            <span className='absolute left-[12%] top-[35%] h-[0.18em] w-[30%] bg-white/80' />
            <span className='absolute right-[12%] top-[25%] h-[0.5em] w-[22%] bg-white/80' />
          </div>
          <div className='absolute inset-x-[16%] top-[72%] flex justify-between'>
            {[0, 1, 2, 3].map(i => <span key={i} className='h-[0.55em] w-[0.55em] rounded-[0.08em] border-[0.06em] border-white/40' />)}
          </div>
        </div>
      </>
    ),
    left: () => <Bands />,
    right: () => <Bands />,
    back: () => <Bands />,
    top: () => <div className='absolute inset-x-0 top-0 h-[1.2em] bg-[#1a3670]' />,
  },

  extras: () => {
    const top = H / 2;
    const x = W / 2 - 1.8;
    const z = D / 2 - 1.8;
    return (
      <>
        <Castor x={-x} z={z} top={top} r={1.3} t={0.9} color='#3a3d41' brake />
        <Castor x={x} z={z} top={top} r={1.3} t={0.9} color='#3a3d41' />
        <Castor x={-x} z={-z} top={top} r={1.3} t={0.9} color='#3a3d41' />
        <Castor x={x} z={-z} top={top} r={1.3} t={0.9} color='#3a3d41' />
      </>
    );
  },

  features: () => [
    { id: 'battery-display', title: 'Smart battery display', text: 'Shows the charge level and battery details.', view: { angle: -10, tilt: -8 }, pins: [{ face: 'front', x: '17%', y: '24%' }] },
    { id: 'inverter', title: 'Inverter control panel', text: 'Status lights, a display and buttons for checking and changing the inverter settings.', view: { angle: -16, tilt: -8 }, pins: [{ face: 'front', x: '59%', y: '19%' }] },
    { id: 'trim', title: 'Aluminium corners', text: 'Aluminium trims protect the edges of the cabinet.', view: { angle: 30, tilt: -10 }, pins: [{ face: 'front', x: '5%', y: '55%' }] },
    { id: 'castors', title: 'Castor wheels', text: 'Four castors roll it into place, with a brake to hold it still.', view: { angle: -26, tilt: 6 }, pins: [{ face: 'front', x: '9%', y: '96%' }, { face: 'front', x: '91%', y: '96%' }] },
  ],
};

export default powerCubeTitanX
