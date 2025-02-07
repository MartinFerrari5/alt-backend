import XLSX from "xlsx";
function exportToExcel(res, data) {
  const headers = [Object.keys(data[0])];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.sheet_add_aoa(worksheet, headers);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.setHeader("Content-Disposition", "attachment; filename=tareas.xlsx");

  res.send(buffer);
}

export { exportToExcel };
