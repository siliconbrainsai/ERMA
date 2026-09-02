import * as XLSX from 'xlsx';

export function exportToCSV(data, filename = 'erma_enterprise_dataset.csv') {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => 
    headers.map(header => {
      let val = obj[header] === null || obj[header] === undefined ? '' : String(obj[header]);
      val = val.replace(/"/g, '""');
      return `"${val}"`;
    }).join(',')
  );

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToExcel(data, filename = 'erma_enterprise_analytics.xlsx') {
  if (!data || data.length === 0) return;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Resource_Analytics");
  XLSX.writeFile(workbook, filename);
}
