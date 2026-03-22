import React from 'react'
import { Calculator, AlertCircle, CheckCircle2 } from 'lucide-react'
import { norms } from '../lib/norms'

function InputGroup({ label, type = 'number', value, onChange }) {
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

function ResultCard({ label, value, highlight = false }) {
  return (
    <div
      className={`p-4 rounded-xl border flex items-center justify-between ${
        highlight ? 'bg-red-50 border-red-200' : 'bg-teal-50/60 border-teal-100'
      }`}
    >
      <span className={`text-sm font-medium ${highlight ? 'text-red-800' : 'text-teal-800'}`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${highlight ? 'text-red-600' : 'text-teal-700'}`}>
          {value}
        </span>
        {highlight ? (
          <AlertCircle size={18} className="text-red-500" />
        ) : (
          <CheckCircle2 size={18} className="text-teal-500" />
        )}
      </div>
    </div>
  )
}

export default function ModelosAnalysis({ modelos, setModelos }) {
  const boltonAnterior =
    modelos.boltonMaxAnt > 0
      ? (modelos.boltonMandAnt / modelos.boltonMaxAnt) * 100
      : 0
  const boltonTotal =
    modelos.boltonMaxTot > 0
      ? (modelos.boltonMandTot / modelos.boltonMaxTot) * 100
      : 0

  const dadSup = modelos.dadDispSup - modelos.dadReqSup
  const dadInf = modelos.dadDispInf - modelos.dadReqInf

  const tanakaSup =
    modelos.tanakaIncInf > 0
      ? modelos.tanakaIncInf / 2 + norms.tanakaSupOffset
      : 0
  const tanakaInf =
    modelos.tanakaIncInf > 0
      ? modelos.tanakaIncInf / 2 + norms.tanakaInfOffset
      : 0

  return (
    <div className="space-y-6">
      {/* Bolton */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="text-teal-600" />
          <h2 className="text-lg font-bold text-teal-900">Análisis de Bolton</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 text-sm">Bolton Anterior</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Suma Maxilar (mm)"
                value={modelos.boltonMaxAnt}
                onChange={e =>
                  setModelos({ ...modelos, boltonMaxAnt: Number(e.target.value) })
                }
              />
              <InputGroup
                label="Suma Mandibular (mm)"
                value={modelos.boltonMandAnt}
                onChange={e =>
                  setModelos({ ...modelos, boltonMandAnt: Number(e.target.value) })
                }
              />
            </div>
            <ResultCard
              label={`Proporción Ant. (Norma: ${norms.boltonAnterior}%)`}
              value={`${boltonAnterior.toFixed(1)}%`}
              highlight={Math.abs(boltonAnterior - norms.boltonAnterior) > 2}
            />
          </div>

          <div className="space-y-4 border-l border-slate-100 pl-6">
            <h3 className="font-semibold text-slate-700 text-sm">Bolton Total</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Suma Maxilar 12 (mm)"
                value={modelos.boltonMaxTot}
                onChange={e =>
                  setModelos({ ...modelos, boltonMaxTot: Number(e.target.value) })
                }
              />
              <InputGroup
                label="Suma Mandibular 12 (mm)"
                value={modelos.boltonMandTot}
                onChange={e =>
                  setModelos({ ...modelos, boltonMandTot: Number(e.target.value) })
                }
              />
            </div>
            <ResultCard
              label={`Proporción Total (Norma: ${norms.boltonTotal}%)`}
              value={`${boltonTotal.toFixed(1)}%`}
              highlight={Math.abs(boltonTotal - norms.boltonTotal) > 2}
            />
          </div>
        </div>
      </div>

      {/* DAD */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-teal-900 mb-4">
          Discrepancia Alvéolo-Dentaria (DAD)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 text-sm">Arco Superior</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Espacio disponible"
                value={modelos.dadDispSup}
                onChange={e =>
                  setModelos({ ...modelos, dadDispSup: Number(e.target.value) })
                }
              />
              <InputGroup
                label="Espacio requerido"
                value={modelos.dadReqSup}
                onChange={e =>
                  setModelos({ ...modelos, dadReqSup: Number(e.target.value) })
                }
              />
            </div>
            <ResultCard
              label="DAD Superior"
              value={`${dadSup > 0 ? '+' : ''}${dadSup.toFixed(1)} mm`}
              highlight={dadSup < 0}
            />
          </div>

          <div className="space-y-4 border-l border-slate-100 pl-6">
            <h3 className="font-semibold text-slate-700 text-sm">Arco Inferior</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Espacio disponible"
                value={modelos.dadDispInf}
                onChange={e =>
                  setModelos({ ...modelos, dadDispInf: Number(e.target.value) })
                }
              />
              <InputGroup
                label="Espacio requerido"
                value={modelos.dadReqInf}
                onChange={e =>
                  setModelos({ ...modelos, dadReqInf: Number(e.target.value) })
                }
              />
            </div>
            <ResultCard
              label="DAD Inferior"
              value={`${dadInf > 0 ? '+' : ''}${dadInf.toFixed(1)} mm`}
              highlight={dadInf < 0}
            />
          </div>
        </div>
      </div>

      {/* Tanaka & Korkhaus básicos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-teal-900 mb-4">
            Predicción Tanaka–Johnston
          </h2>
          <InputGroup
            label="Suma 4 incisivos inferiores (mm)"
            value={modelos.tanakaIncInf}
            onChange={e =>
              setModelos({ ...modelos, tanakaIncInf: Number(e.target.value) })
            }
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <ResultCard
              label="Espacio requerido sup/cuadrante"
              value={`${tanakaSup.toFixed(1)} mm`}
            />
            <ResultCard
              label="Espacio requerido inf/cuadrante"
              value={`${tanakaInf.toFixed(1)} mm`}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-teal-900 mb-4">
            Análisis Transversal (Korkhaus básico)
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <InputGroup
              label="Distancia inter–premolar (mm)"
              value={modelos.korkhausPrem}
              onChange={e =>
                setModelos({ ...modelos, korkhausPrem: Number(e.target.value) })
              }
            />
            <InputGroup
              label="Distancia inter–molar (mm)"
              value={modelos.korkhausMol}
              onChange={e =>
                setModelos({ ...modelos, korkhausMol: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
