import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportToPDF({ paciente, modelos, facial }) {
  const node = document.getElementById('report-root')
  if (!node) {
    alert('No se encontró el reporte para exportar.')
    return
  }

  const canvas = await html2canvas(node, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth - 20
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
  pdf.save(`Estudio_${paciente?.nombre || 'Paciente'}.pdf`)
}

export function exportToJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ortho-estudio-${data.paciente?.nombre || 'paciente'}.json`
  a.click()
  URL.revokeObjectURL(url)
}
