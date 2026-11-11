'use client'
import React, { useState } from 'react'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import PowerCube3D from '@/components/powerCube3D';

// Features of the PowerCube, in the order they are numbered on the model.
// Each has the view the model turns to, and one or more markers placed on
// its faces (x/y are percentages of that face).
function getFeatures(product) {
  const output = Number(product.inverter).toLocaleString();
  const battery = Number(product.battery).toLocaleString();
  return [
    {
      id: 'switch',
      title: 'Power switch',
      text: 'Turns the PowerCube on and off.',
      view: { angle: -16, tilt: -8 },
      pins: [{ face: 'front', x: '28%', y: '12%' }],
    },
    {
      id: 'display',
      title: 'Battery display',
      text: 'Shows how much charge is left, from 0 to 100%.',
      view: { angle: -10, tilt: -8 },
      pins: [{ face: 'front', x: '60%', y: '6.5%' }],
    },
    {
      id: 'lights',
      title: 'Status lights',
      text: 'Green, amber and red lights show charging and battery status at a glance.',
      view: { angle: -16, tilt: -8 },
      pins: [{ face: 'front', x: '72%', y: '12%' }],
    },
    {
      id: 'ac-output',
      title: 'AC output socket',
      text: `230V~ 50Hz. Plug in a TV, fan, lights or laptop, up to ${output}W in total.`,
      view: { angle: -18, tilt: -50 },
      pins: [{ face: 'top', x: '60%', y: '22%' }],
    },
    {
      id: 'inputs',
      title: 'Charging ports',
      text: 'Connect the AC adapter (220V, up to 1,500W) or the DC input for solar and car charging (13V, 10A max).',
      view: { angle: -64, tilt: -10 },
      pins: [{ face: 'right', x: '74%', y: '28%' }],
    },
    {
      id: 'vents',
      title: 'Cooling vents',
      text: 'Vents on the top and sides let heat out, so the battery and inverter stay cool.',
      view: { angle: 48, tilt: -32 },
      pins: [
        { face: 'top', x: '21%', y: '50%' },
        { face: 'left', x: '50%', y: '37%' },
        { face: 'right', x: '69%', y: '57%' },
      ],
    },
    {
      id: 'label',
      title: 'Rating label',
      text: `Model and ratings: ${battery}Wh battery, ${output}W output.`,
      view: { angle: 162, tilt: -8 },
      pins: [{ face: 'back', x: '76%', y: '38%' }],
    },
  ];
}

function SpecsInPicture({ product }) {
  const features = getFeatures(product);
  const [activeId, setActiveId] = useState(null);
  const active = features.find(feature => feature.id === activeId) || null;

  // clicking the selected feature again lets the model spin freely
  const select = (id) => setActiveId(current => (current === id ? null : id));

  const pins = features.flatMap((feature, index) =>
    feature.pins.map(pin => ({ ...pin, id: feature.id, n: index + 1, label: feature.title }))
  );

  const specs = [
    ['Battery', `${Number(product.battery).toLocaleString()} Wh LiFePO4`],
    ['Output', `${Number(product.inverter).toLocaleString()} W`],
    ['AC charging', product.AcCharging],
    ['Solar charging', product.solarCharging],
    ['Size (L × W × H)', `${product.length} × ${product.width} × ${product.height}`],
    ['Weight', product.weight],
  ];

  return (
    <div className='mt-6' role='tabpanel'>
      <div className='grid gap-6 lg:grid-cols-[1.3fr_1fr]'>
        <div className='stage relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3]'>
          <PowerCube3D
            className='absolute inset-0 text-[8.5px] sm:text-[11px] lg:text-[12px]'
            autoRotate={!active}
            focus={active ? active.view : null}
            pins={pins}
            activePin={activeId}
            onPin={select}
          />
          <p className='pointer-events-none absolute inset-x-0 top-4 flex items-center justify-center gap-1.5 text-xs font-medium text-graphite-500'>
            <ThreeSixtyIcon sx={{ fontSize: 16 }} /> Tap a number, or drag to turn
          </p>
          {/* on small screens the list sits below the model, so repeat the selected feature here */}
          {active && (
            <div className='pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl bg-graphite-950/85 p-4 text-white shadow-xl backdrop-blur sm:inset-x-auto sm:left-4 sm:max-w-xs lg:hidden' aria-live='polite'>
              <p className='flex items-center gap-2 font-semibold'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold'>{features.indexOf(active) + 1}</span>
                {active.title}
              </p>
              <p className='mt-1 text-sm text-white/70'>{active.text}</p>
            </div>
          )}
        </div>

        <ol className='space-y-2'>
          {features.map((feature, index) => {
            const isActive = feature.id === activeId;
            return (
              <li key={feature.id}>
                <button
                  type='button'
                  onClick={() => select(feature.id)}
                  aria-pressed={isActive}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${isActive ? 'bg-brand-500/10 ring-2 ring-brand-400' : 'ring-1 ring-line/10 hover:bg-surface hover:ring-line/20'}`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isActive ? 'bg-brand-400 text-graphite-950' : 'bg-brand-600 text-white'}`}>{index + 1}</span>
                  <span>
                    <span className='block text-sm font-semibold'>{feature.title}</span>
                    <span className='block text-sm text-muted'>{feature.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <dl className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3'>
        {specs.map(([label, value]) => (
          <div key={label} className='rounded-2xl bg-surface p-4 ring-1 ring-line/10'>
            <dt className='text-xs text-muted'>{label}</dt>
            <dd className='mt-1 font-semibold'>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default SpecsInPicture
