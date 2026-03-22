import React from 'react'
import { Activity, FileText, Ruler, ScanFace, User, Printer } from 'lucide-react'
import clsx from 'clsx'

const tabsConfig = [
  { id: 'paciente', icon: User, label: 'Datos del Paciente' },
  { id: 'modelos', icon: Ruler, label: 'Análisis de Modelos' },
  { id: 'facial', icon: ScanFace, label: 'Análisis Facial' },
  { id: 'cefalometria', icon: Activity, label: 'Cefalometría' },
  { id: 'reporte', icon: FileText, label: 'Reporte Final' },
]

export default function Sidebar({ activeTab, setActiveTab, onExport }) {
  return (
    <aside className="w-64 bg-teal-900 text-teal-50 flex flex-col shadow-xl print:hidden">
      <div className="p-6 text-2xl font-bold border-b border-teal-800 flex items-center gap-2">
        <Activity className="w-8 h-8 text-teal-400" />
        <span>OrthoStudio</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {tabsConfig.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all duration-200 text-sm',
              activeTab === tab.id
                ? 'bg-teal-800 font-semibold shadow-inner'
                : 'hover:bg-teal-800/50 text-teal-100',
            )}
          >
            <tab.icon
              size={20}
              className={activeTab === tab.id ? 'text-teal-300' : 'text-teal-400'}
            />
            <span className="flex-1">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-teal-800 bg-teal-950">
        <button
          onClick={onExport}
          className="w-full bg-teal-500 hover:bg-teal-400 text-white p-3 rounded-lg font-semibold shadow-md transition flex items-center justify-center gap-2"
        >
          <Printer size={20} />
          Imprimir / Exportar
        </button>
      </div>
    </aside>
  )
}
