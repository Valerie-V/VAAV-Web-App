import React from 'react'
import { Screw, perforated } from '../parts'

// PowerCube: slim steel case. Front has a switch, charge display and status
// lights over a black brand panel; top has vents and an AC socket.

const metal = '#3a3e41';
const metalDark = '#2d3134';

const powerCube = {
  name: 'PowerCube',
  W: 20,
  H: 21,
  D: 6.5,
  defaults: { battery: '960', inverter: '500' },
  skins: {
    body: { background: metalDark },
    front: { background: metal },
    top: { background: '#3a3e41' },
    bottom: { background: '#141617' },
  },
  faces: {
    front: () => (
      <>
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
      </>
    ),

    back: (p) => (
      <>
        <div className='absolute left-1/2 top-[38%] w-[52%] -translate-x-1/2 rounded-[0.3em] bg-[#d8dcd9] px-[0.8em] py-[0.7em] text-[#1d2120]'>
          <p className='text-[0.8em] font-bold tracking-[0.08em]'>VAAV</p>
          <p className='text-[0.62em] font-semibold'>PowerCube</p>
          <div className='mt-[0.4em] h-px bg-[#1d2120]/30' />
          <p className='mt-[0.4em] text-[0.5em] leading-snug'>Battery {p.battery}Wh · LiFePO4<br />Output {p.inverter}W</p>
        </div>
        <Screw style={{ left: '0.5em', top: '0.5em' }} />
        <Screw style={{ right: '0.5em', top: '0.5em' }} />
        <Screw style={{ left: '0.5em', bottom: '0.5em' }} />
        <Screw style={{ right: '0.5em', bottom: '0.5em' }} />
      </>
    ),

    // two round charging ports and a vent near the back edge
    // (on this face the left edge meets the front)
    right: () => (
      <>
        {['22%', '34%'].map(top => (
          <span
            key={top}
            className='absolute left-[38%] h-[1.5em] w-[1.5em] -translate-x-1/2 rounded-full'
            style={{ top, background: 'radial-gradient(circle, #0b0c0d 30%, #3e4245 34%, #1a1c1d 62%, #4a4e51 100%)' }}
          />
        ))}
        <div className='absolute right-[12%] top-[46%] h-[22%] w-[38%]' style={perforated()} />
      </>
    ),

    left: () => (
      <>
        <div className='absolute inset-x-[16%] top-[30%] h-[14%]' style={perforated()} />
        <div className='absolute inset-x-[16%] top-[54%] h-[14%]' style={perforated()} />
      </>
    ),

    // vent grilles either side of an AC socket
    top: () => (
      <>
        <div className='absolute inset-y-[18%] left-[6%] w-[30%]' style={perforated()} />
        <div className='absolute inset-y-[18%] right-[6%] w-[30%]' style={perforated()} />
        <div className='absolute left-1/2 top-1/2 flex h-[3em] w-[3.2em] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[0.3em] bg-[#1c1e20] ring-1 ring-black/60'>
          <span className='relative h-[1.9em] w-[2em] rounded-[0.2em] bg-[#2b2e30]'>
            <span className='absolute left-[22%] top-[28%] h-[0.7em] w-[0.22em] bg-black' />
            <span className='absolute right-[22%] top-[28%] h-[0.7em] w-[0.22em] bg-black' />
            <span className='absolute bottom-[14%] left-1/2 h-[0.35em] w-[0.35em] -translate-x-1/2 rounded-full bg-black' />
          </span>
        </div>
      </>
    ),

    bottom: () => (
      <>
        {[['8%', '20%'], ['92%', '20%'], ['8%', '80%'], ['92%', '80%']].map(([left, top]) => (
          <span key={left + top} className='absolute h-[0.9em] w-[0.9em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black' style={{ left, top }} />
        ))}
      </>
    ),
  },

  features: (p) => {
    const output = Number(p.inverter).toLocaleString();
    const battery = Number(p.battery).toLocaleString();
    return [
      { id: 'switch', title: 'Power switch', text: 'Turns the PowerCube on and off.', view: { angle: -16, tilt: -8 }, pins: [{ face: 'front', x: '28%', y: '12%' }] },
      { id: 'display', title: 'Battery display', text: 'Shows how much charge is left, from 0 to 100%.', view: { angle: -10, tilt: -8 }, pins: [{ face: 'front', x: '60%', y: '6.5%' }] },
      { id: 'lights', title: 'Status lights', text: 'Green, amber and red lights show charging and battery status at a glance.', view: { angle: -16, tilt: -8 }, pins: [{ face: 'front', x: '72%', y: '12%' }] },
      { id: 'ac-output', title: 'AC output socket', text: `230V~ 50Hz. Plug in a TV, fan, lights or laptop, up to ${output}W in total.`, view: { angle: -18, tilt: -50 }, pins: [{ face: 'top', x: '60%', y: '22%' }] },
      { id: 'inputs', title: 'Charging ports', text: 'Connect the AC adapter (220V, up to 1,500W) or the DC input for solar and car charging (13V, 10A max).', view: { angle: -64, tilt: -10 }, pins: [{ face: 'right', x: '74%', y: '28%' }] },
      {
        id: 'vents',
        title: 'Cooling vents',
        text: 'Vents on the top and sides let heat out, so the battery and inverter stay cool.',
        view: { angle: 48, tilt: -32 },
        pins: [{ face: 'top', x: '21%', y: '50%' }, { face: 'left', x: '50%', y: '37%' }, { face: 'right', x: '69%', y: '57%' }],
      },
      { id: 'label', title: 'Rating label', text: `Model and ratings: ${battery}Wh battery, ${output}W output.`, view: { angle: 162, tilt: -8 }, pins: [{ face: 'back', x: '76%', y: '38%' }] },
    ];
  },
};

export default powerCube
