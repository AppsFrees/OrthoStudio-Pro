import React from 'react'

function InputGroup({ label, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow text-slate-800"
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
        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-shadow text-slate-800"
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

export default function PatientForm({ paciente, setPaciente }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-teal-900 mb-6 border-b pb-2 border-slate-100">
        Ficha Clínica del Paciente
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup
          label="Nombre Completo"
          value={paciente.nombre}
          onChange={e => setPaciente({ ...paciente, nombre: e.target.value })}
        />
        <InputGroup
          label="Edad"
          type="number"
          value={paciente.edad}
          onChange={e => setPaciente({ ...paciente, edad: e.target.value })}
        />
        <SelectGroup
          label="Sexo"
          value={paciente.sexo}
          onChange={e => setPaciente({ ...paciente, sexo: e.target.value })}
          options={['Masculino', 'Femenino', 'Otro']}
        />
        <SelectGroup
          label="Tipo de Dentición"
          value={paciente.denticion}
          onChange={e => setPaciente({ ...paciente, denticion: e.target.value })}
          options={['Decidua', 'Mixta', 'Permanente']}
        />
        <InputGroup
          label="Fecha de Evaluación"
          type="date"
          value={paciente.fecha}
          onChange={e => setPaciente({ ...paciente, fecha: e.target.value })}
        />
      </div>
    </div>
  )
}
