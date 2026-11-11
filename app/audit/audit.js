'use client'
import React, { useRef, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import { useStateValue } from '@/context/StateProvider';
import { summarizeAudit } from '@/lib/audit';

// Typical wattages, used to pre-fill the rating. Users can adjust them.
const APPLIANCE_PRESETS = [
  { name: 'Bulb', watts: 10 },
  { name: 'Fan', watts: 45 },
  { name: 'TV', watts: 150 },
  { name: 'Decoder (DStv/GOtv)', watts: 25 },
  { name: 'Wi-Fi router', watts: 10 },
  { name: 'Laptop', watts: 65 },
  { name: 'Desktop computer', watts: 200 },
  { name: 'Phone', watts: 30 },
  { name: 'Sound system', watts: 100 },
  { name: 'CCTV camera', watts: 10 },
  { name: 'Fridge', watts: 300 },
  { name: 'Freezer', watts: 400 },
  { name: 'Water dispenser', watts: 500 },
  { name: 'Blender', watts: 600 },
  { name: 'Microwave', watts: 960 },
  { name: 'Washing machine', watts: 500 },
  { name: 'Air conditioner (1HP)', watts: 900 },
  { name: 'Electric Iron', watts: 2000 },
  { name: 'Pumping Machine', watts: 2000 },
];

const QUICK_ADD = ['Bulb', 'Fan', 'TV', 'Fridge', 'Laptop', 'Phone'];

const EMPTY = { equipment: '', rating: '', quantity: '1', dailyUsage: '' };

// Appliance list for the energy audit. Entries live in the shared app state,
// so they survive moving between pages.
function Auditing() {
  const [{ audit }, dispatch] = useStateValue()
  const [form, setForm] = useState(EMPTY);
  // id of the appliance being edited, or null when adding a new one
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);
  const { items, dailyEnergy, peakPower } = summarizeAudit(audit);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const choosePreset = (name) => {
    const preset = APPLIANCE_PRESETS.find(p => p.name === name);
    setForm(prev => ({ ...prev, equipment: name, rating: preset ? String(preset.watts) : prev.rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      equipment: form.equipment || 'Other appliance',
      rating: form.rating,
      quantity: form.quantity,
      totalPower: Number(form.rating) * Number(form.quantity),
      dailyUsage: form.dailyUsage,
    };

    if (editingId !== null) {
      dispatch({ type: 'UPDATE_AUDIT', payload: { id: editingId, ...entry } });
    } else {
      const id = audit.length ? Math.max(...audit.map(a => a.id)) + 1 : 1;
      dispatch({ type: 'ADD_TO_AUDIT', payload: { id, ...entry } });
    }
    setEditingId(null);
    setForm(EMPTY);
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({
      equipment: row.equipment,
      rating: String(row.rating),
      quantity: String(row.quantity),
      dailyUsage: String(row.dailyUsage),
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formRef.current?.querySelector('#rating')?.focus({ preventScroll: true });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const handleDelete = (id) => {
    if (id === editingId) cancelEdit();
    dispatch({ type: 'REMOVE_FROM_AUDIT', payload: id });
  };

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_340px]'>
      <div className='flex flex-col gap-6'>
        {/* add appliance */}
        <form ref={formRef} className={`card p-6 md:p-8 transition ${editingId !== null ? 'ring-2 ring-brand-400' : ''}`} onSubmit={handleSubmit}>
          <h2 className='text-xl font-bold'>{editingId !== null ? 'Edit appliance' : 'Add an appliance'}</h2>
          <div className='mt-4 flex flex-wrap gap-2'>
            {QUICK_ADD.map(name => (
              <button key={name} type='button' onClick={() => choosePreset(name)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${form.equipment === name ? 'bg-brand-500 text-white' : 'bg-surface text-ink ring-1 ring-inset ring-line/10 hover:ring-line/20'}`}>
                {name}
              </button>
            ))}
          </div>

          <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]'>
            <div>
              <label htmlFor='equipment' className='label'>Appliance</label>
              <select id='equipment' value={form.equipment} className='input' onChange={(e) => choosePreset(e.target.value)}>
                <option value=''>Choose an appliance</option>
                {APPLIANCE_PRESETS.map(preset => (
                  <option key={preset.name} value={preset.name}>{preset.name}</option>
                ))}
                <option value='Other appliance'>Other</option>
                {form.equipment && form.equipment !== 'Other appliance' && !APPLIANCE_PRESETS.some(p => p.name === form.equipment) && (
                  <option value={form.equipment}>{form.equipment}</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor='rating' className='label'>Watts</label>
              <input id='rating' className='input' type='number' placeholder='e.g. 45' value={form.rating} required min='1' onChange={update('rating')} />
            </div>
            <div>
              <label htmlFor='quantity' className='label'>How many</label>
              <input id='quantity' className='input' type='number' value={form.quantity} required min='1' onChange={update('quantity')} />
            </div>
            <div>
              <label htmlFor='hours' className='label'>Hours / day</label>
              <input id='hours' className='input' type='number' placeholder='e.g. 6' value={form.dailyUsage} required min='0.5' step='0.5' max='24' onChange={update('dailyUsage')} />
            </div>
          </div>
          {editingId !== null ? (
            <div className='mt-6 flex flex-wrap gap-3'>
              <button type='submit' className='btn-primary'>
                <CheckIcon sx={{ fontSize: 18 }} /> Save changes
              </button>
              <button type='button' onClick={cancelEdit} className='btn-secondary'>Cancel</button>
            </div>
          ) : (
            <button type='submit' className='btn-primary mt-6'>
              <AddIcon sx={{ fontSize: 18 }} /> Add to list
            </button>
          )}
        </form>

        {/* appliance list */}
        <div className='card overflow-hidden'>
          <div className='flex items-center justify-between border-b border-line/10 px-6 py-4'>
            <h2 className='text-lg font-bold'>Your appliances</h2>
            <span className='chip'>{items.length}</span>
          </div>
          {items.length === 0 ? (
            <p className='px-6 py-12 text-center text-muted'>Nothing added yet. Start with the appliances you use most.</p>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[560px] text-left text-sm'>
                <thead className='text-muted'>
                  <tr>
                    <th scope='col' className='px-6 py-3 font-medium'>Appliance</th>
                    <th scope='col' className='px-3 py-3 text-right font-medium'>Watts</th>
                    <th scope='col' className='px-3 py-3 text-right font-medium'>Qty</th>
                    <th scope='col' className='px-3 py-3 text-right font-medium'>Hours/day</th>
                    <th scope='col' className='px-3 py-3 text-right font-medium'>Energy/day</th>
                    <th scope='col' className='px-6 py-3'><span className='sr-only'>Actions</span></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-line/10'>
                  {items.map(row => (
                    <tr key={row.id} className={row.id === editingId ? 'bg-brand-500/10' : ''}>
                      <td className='px-6 py-3 font-medium'>{row.equipment}</td>
                      <td className='px-3 py-3 text-right'>{Number(row.rating).toLocaleString()}</td>
                      <td className='px-3 py-3 text-right'>{row.quantity}</td>
                      <td className='px-3 py-3 text-right'>{row.dailyUsage}</td>
                      <td className='px-3 py-3 text-right font-semibold'>{(row.rating * row.quantity * row.dailyUsage).toLocaleString()} Wh</td>
                      <td className='px-6 py-3'>
                        <div className='flex justify-end gap-1'>
                          <button type='button' onClick={() => startEdit(row)} className={`rounded-full p-2 transition hover:bg-brand-500/10 hover:text-pop ${row.id === editingId ? 'bg-brand-500/15 text-pop' : 'text-muted'}`} aria-label={`Edit ${row.equipment}`} title='Edit'>
                            <EditOutlinedIcon fontSize='small' />
                          </button>
                          <button type='button' onClick={() => handleDelete(row.id)} className='rounded-full p-2 text-muted transition hover:bg-red-500/10 hover:text-red-400' aria-label={`Remove ${row.equipment}`} title='Remove'>
                            <DeleteOutlineIcon fontSize='small' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* live totals */}
      <aside className='flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start'>
        <div className='card p-6'>
          <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300'><BoltOutlinedIcon /></span>
          <p className='mt-4 text-sm text-muted'>Total load</p>
          <p className='text-3xl font-bold tracking-tight'>{peakPower.toLocaleString()} W</p>
          <p className='mt-1 text-xs text-muted'>If everything runs at once. Decides the output you need.</p>
        </div>
        <div className='card p-6'>
          <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-pop'><BatteryChargingFullOutlinedIcon /></span>
          <p className='mt-4 text-sm text-muted'>Daily energy</p>
          <p className='text-3xl font-bold tracking-tight'>{dailyEnergy.toLocaleString()} Wh</p>
          <p className='mt-1 text-xs text-muted'>What you use in a day. Decides the battery and solar you need.</p>
        </div>
      </aside>
    </div>
  )
}

export default Auditing
