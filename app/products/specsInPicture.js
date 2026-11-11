'use client'
import React, { useState } from 'react'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import Model3D from '@/components/model3d/model3d';
import { getModel } from '@/components/model3d/models';

function SpecsInPicture({ product }) {
  // features are numbered on the model in this order; each has the view the
  // model turns to and markers placed on its faces
  const features = getModel(product.model3d).features({ ...getModel(product.model3d).defaults, ...product });
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
          <Model3D
            model={product.model3d}
            product={product}
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
