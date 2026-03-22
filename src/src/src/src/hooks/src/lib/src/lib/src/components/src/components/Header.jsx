import React from 'react'

const labels = {
  paciente: 'Datos del Paciente',
  modelos: 'Análisis de Modelos',
  facial: 'Análisis Facial y Sonrisa',
  cefalometria: 'Cefalometría',
  reporte: 'Reporte Final',
}

export default function Header({ paciente, activeTab }) {
  return (
    <header className="bg-white shadow-sm p-6 flex justify-between items-center z-10 print:hidden">
      <h1 className="text-2xl font-semibold text-slate-700">
        {labels[activeTab] || 'OrthoStudio Pro'}
      </h1>
      <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
        <span className="text-teal-700 font-bold">
          {paciente.nombre || 'Paciente sin nombre'}
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-400" />
        <span>{paciente.edad || 'Edad ?'} años</span>
        <span className="w-1 h-1 rounded-full bg-slate-400" />
        <span>{paciente.denticion || 'Dentición ?'}</span>
      </div>
    </header>
  )
}
