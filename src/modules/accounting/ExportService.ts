import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToPDF = (title: string, headers: string[][], data: any[][], filename: string) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42); // Deep Navy (#0f172a)
  doc.text(title, 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le : ${new Date().toLocaleString()}`, 14, 30);
  doc.text('ERP GestionPro - Suite Financière (Morning Horizon)', 14, 35);

  doc.autoTable({
    startY: 45,
    head: headers,
    body: data,
    theme: 'striped',
    headStyles: { fillColor: [0, 94, 184], textColor: 255 }, // SAP Blue (#005eb8)
    styles: { fontSize: 8 },
    margin: { top: 45 },
  });

  doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
