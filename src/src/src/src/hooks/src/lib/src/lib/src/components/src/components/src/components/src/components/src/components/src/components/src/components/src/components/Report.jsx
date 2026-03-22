import React from 'react'
import ReportRow from './ReportRow'
import { norms } from '../lib/norms'

function ReportRowSimple({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-slate-100 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-800 text-right">{value}</span>
    </div>
  )
}

export default function Report({ paciente, modelos, facial }) {
  const boltonAnt =
    modelos.boltonMaxAnt > 0
      ? (modelos.boltonMandAnt / modelos.boltonMaxAnt) * 100
      : 0
  const boltonTot =
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
    <div
      id="report-root"
      className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:p-4"
    >
      {/* Cabecera */}
      <div className="border-b-2 border-teal-800 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 tracking-tight">
            Reporte Ortodóntico Integral
          </h1>
          <p className="text-slate-500 mt-1">OrthoStudio Pro - Análisis Clínico</p>
        </div>
        <div className="text-right text-sm text-slate-600">
          <p>
            Fecha:{' '}
            <span className="font-semibold">
              {paciente.fecha || new Date().toLocaleDateString()}
            </span>
          </p>
          <p>Dr./Dra. Tratante</p>
        </div>
      </div>

      {/* Datos paciente */}
      <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-slate-300">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-4">
          I. Datos del Paciente
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <ReportRowSimple label="Nombre" value={paciente.nombre || '-'} />
          <ReportRowSimple label="Edad" value={`${paciente.edad || '-'} años`} />
          <ReportRowSimple label="Sexo" value={paciente.sexo || '-'} />
          <ReportRowSimple label="Dentición" value={paciente.denticion || '-'} />
        </div>
      </div>

      {/* Modelos */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-4 border-b border-slate-200 pb-2">
          II. Análisis de Modelos Dentales
        </h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
          <div>
            <h4 className="font-bold text-slate-700 mb-2">Análisis de Bolton</h4>
            <ReportRowSimple
              label="Proporción anterior"
              value={`${boltonAnt.toFixed(1)} % (Norma ${norms.boltonAnterior} %)`}
            />
            <ReportRowSimple
              label="Proporción total"
              value={`${boltonTot.toFixed(1)} % (Norma ${norms.boltonTotal} %)`}
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-700 mb-2">Discrepancia arco–diente</h4>
            <ReportRowSimple
              label="DAD superior"
              value={`${dadSup > 0 ? '+' : ''}${dadSup.toFixed(1)} mm`}
            />
            <ReportRowSimple
              label="DAD inferior"
              value={`${dadInf > 0 ? '+' : ''}${dadInf.toFixed(1)} mm`}
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-700 mb-2">Predicción Tanaka–Johnston</h4>
            <ReportRowSimple
              label="Espacio requerido sup/cuadrante"
              value={`${tanakaSup.toFixed(1)} mm`}
            />
            <ReportRowSimple
              label="Espacio requerido inf/cuadrante"
              value={`${tanakaInf.toFixed(1)} mm`}
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-700 mb-2">Análisis transversal</h4>
            <ReportRowSimple
              label="Distancia inter–premolar"
              value={`${modelos.korkhausPrem || 0} mm`}
            />
            <ReportRowSimple
              label="Distancia inter–molar"
              value={`${modelos.korkhausMol || 0} mm`}
            />
          </div>
        </div>
      </div>

      {/* Facial */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-4 border-b border-slate-200 pb-2">
          III. Análisis Facial y Fotográfico
        </h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <ReportRowSimple label="Tercios faciales" value={facial.tercios || '-'} />
          <ReportRowSimple label="Tercio inferior" value={facial.tercioInf || '-'} />
          <ReportRowSimple
            label="Anchura bicigomática"
            value={`${facial.bicigomatica || 0} mm`}
          />
          <ReportRowSimple
            label="Ángulo nasolabial"
            value={`${facial.nasolabial || 0} °`}
          />
          <ReportRowSimple
            label="Ángulo mentolabial"
            value={`${facial.mentolabial || 0} °`}
          />
          <ReportRowSimple label="Línea estética (E)" value={facial.lineaE || '-'} />
          <ReportRowSimple label="Corredores bucales" value={facial.corredores || '-'} />
          <ReportRowSimple
            label="Línea de la sonrisa"
            value={facial.lineaSonrisa || '-'}
          />
          <ReportRowSimple
            label="Exposición gingival"
            value={`${facial.exposGing || 0} mm`}
          />
        </div>
      </div>

      <div className="mt-12 text-xs text-slate-400 border-t border-slate-200 pt-4 text-center print:block">
        Reporte generado automáticamente por OrthoStudio Pro. Documento auxiliar para
        diagnóstico ortodóntico.
      </div>
    </div>
  )
}
