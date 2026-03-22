import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import PatientForm from './components/PatientForm'
import ModelosAnalysis from './components/ModelosAnalysis'
import FacialAnalysis from './components/FacialAnalysis'
import CefaloPlaceholder from './components/Cefalo'
import Report from './components/Report'
import useLocalStorage from './hooks/useLocalStorage'
import { exportToPDF, exportToJSON } from './lib/export'
import { Printer, Download } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState('paciente')
  const [exportOpen, setExportOpen] = useState(false)

  const [paciente, setPaciente] = useLocalStorage('paciente', {
    nombre: 'Juan Pérez',
    edad: '14',
    sexo: 'Masculino',
    denticion: 'Permanente',
    fecha: new Date().toISOString().split('T')[0],
  })

  const [modelos, setModelos] = useLocalStorage('modelos', {
    boltonMaxAnt: 48,
    boltonMandAnt: 37,
    boltonMaxTot: 95,
    boltonMandTot: 87,
    dadDispSup: 70,
    dadReqSup: 74,
    dadDispInf: 68,
    dadReqInf: 70,
    tanakaIncInf: 23,
    korkhausPrem: 35,
    korkhausMol: 47,
  })

  const [facial, setFacial] = useLocalStorage('facial', {
    tercios: 'Simétricos',
    tercioInf: 'Aumentado',
    bicigomatica: 120,
    nasolabial: 102,
    mentolabial: 130,
    lineaE: '-2mm (Labio inferior)',
    corredores: 'Estrechos',
    lineaSonrisa: 'Consonante',
    exposGing: 2,
  })

  const renderTab = () => {
    switch (activeTab) {
      case 'paciente':
        return <PatientForm paciente={paciente} setPaciente={setPaciente} />
      case 'modelos':
        return <ModelosAnalysis modelos={modelos} setModelos={setModelos} />
      case 'facial':
        return <FacialAnalysis facial={facial} setFacial={setFacial} />
      case 'cefalometria':
        return <CefaloPlaceholder />
      case 'reporte':
        return <Report paciente={paciente} modelos={modelos} facial={facial} />
      default:
        return null
    }
  }

  const handleExportPDF = async () => {
    await exportToPDF({ paciente, modelos, facial })
  }

  const handleExportJSON = () => {
    exportToJSON({ paciente, modelos, facial })
  }

  return (
    <div className="flex h-screen bg-slate-50 print:h-auto print:bg-white">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={() => setExportOpen(true)}
      />

      <div className="flex-1 flex flex-col overflow-hidden print:overflow-visible">
        <Header paciente={paciente} activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-8 print:p-0 bg-slate-50 print:bg-white">
          <div className="max-w-6xl mx-auto space-y-8">
            {renderTab()}
          </div>
        </main>
      </div>

      <Dialog open={exportOpen} onClose={() => setExportOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
            <Dialog.Title className="text-2xl font-bold text-teal-900 mb-4">
              Exportar Estudio
            </Dialog.Title>
            <div className="space-y-4">
              <button
                onClick={handleExportPDF}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3"
              >
                <Printer size={20} />
                PDF profesional
              </button>
              <button
                onClick={handleExportJSON}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3"
              >
                <Download size={20} />
                JSON (import/export)
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
