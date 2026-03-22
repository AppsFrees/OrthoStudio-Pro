import React from 'react'

function InputGroup({ label, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
      />
    </div>
  )
}

function SelectGroup({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function FacialAnalysis({ facial, setFacial }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-teal-900 mb-6">Análisis Frontal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectGroup
            label="Tercios faciales"
            value={facial.tercios}
            onChange={e => setFacial({ ...facial, tercios: e.target.value })}
            options={['Simétricos', 'Asimétricos', 'Tercio inf. aumentado', 'Tercio inf. disminuido']}
          />
          <SelectGroup
            label="Tercio inferior"
            value={facial.tercioInf}
            onChange={e => setFacial({ ...facial, tercioInf: e.target.value })}
            options={['Proporcional', 'Aumentado', 'Disminuido']}
          />
          <InputGroup
            label="Anchura bicigomática (mm)"
            type="number"
            value={facial.bicigomatica}
            onChange={e => setFacial({ ...facial, bicigomatica: e.target.value })}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-teal-900 mb-6">Análisis de Perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputGroup
            label="Ángulo nasolabial (°)"
            type="number"
            value={facial.nasolabial}
            onChange={e => setFacial({ ...facial, nasolabial: e.target.value })}
          />
          <InputGroup
            label="Ángulo mentolabial (°)"
            type="number"
            value={facial.mentolabial}
            onChange={e => setFacial({ ...facial, mentolabial: e.target.value })}
          />
          <InputGroup
            label="Línea estética (Línea E)"
            value={facial.lineaE}
            onChange={e => setFacial({ ...facial, lineaE: e.target.value })}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-teal-900 mb-6">Análisis de la Sonrisa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectGroup
            label="Corredores bucales"
            value={facial.corredores}
            onChange={e => setFacial({ ...facial, corredores: e.target.value })}
            options={['Adecuados', 'Estrechos', 'Amplios']}
          />
          <SelectGroup
            label="Línea de la sonrisa"
            value={facial.lineaSonrisa}
            onChange={e => setFacial({ ...facial, lineaSonrisa: e.target.value })}
            options={['Consonante', 'Plana', 'Invertida']}
          />
          <InputGroup
            label="Exposición gingival (mm)"
            type="number"
            value={facial.exposGing}
            onChange={e => setFacial({ ...facial, exposGing: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
