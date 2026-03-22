import React from 'react'
import { Activity } from 'lucide-react'

export default function CefaloPlaceholder() {
  return (
    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center min-h-[320px]">
      <Activity className="w-16 h-16 text-teal-200 mb-4" />
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Módulo Cefalométrico</h2>
      <p className="text-slate-500 mb-6 max-w-md">
        Aquí podrás cargar radiografías laterales de cráneo (JPG/PNG) y realizar trazados de
        Steiner, Ricketts o McNamara. Módulo gráfico por implementar.
      </p>
      <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium shadow transition">
        Subir radiografía (próximamente)
      </button>
    </div>
  )
}
