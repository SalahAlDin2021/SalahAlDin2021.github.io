let currentPage = 1;
const rowsPerPage = 5;

function sortTable(columnIndex) {
  const table = document.getElementById("responsiveTable");
  const rows = Array.from(table.rows).slice(1);
  const isAsc = table.dataset.sortOrder !== "asc";

  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].innerText.toLowerCase();
    const cellB = b.cells[columnIndex].innerText.toLowerCase();
    return isAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
  });

  rows.forEach(row => table.tBodies[0].appendChild(row));
  table.dataset.sortOrder = isAsc ? "asc" : "desc";
}

function filterTable() {
  const filter = document.getElementById("filterInput").value.toLowerCase();
  const table = document.getElementById("responsiveTable");
  const rows = table.tBodies[0].rows;

  Array.from(rows).forEach(row => {
    const cells = Array.from(row.cells);
    row.style.display = cells.some(cell => cell.innerText.toLowerCase().includes(filter)) ? "" : "none";
  });
}

function changePage(step) {
  const table = document.getElementById("responsiveTable");
  const rows = Array.from(table.tBodies[0].rows);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  currentPage += step;
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  rows.forEach((row, index) => {
    row.style.display = index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage ? "" : "none";
  });

  document.getElementById("pageDisplay").innerText = `Page ${currentPage}`;
}

// Initialize pagination
document.addEventListener("DOMContentLoaded", () => {
  changePage(0);
});

function filterColumn(columnIndex, inputElement) {
  const filter = inputElement.value.toLowerCase();
  const table = document.getElementById("responsiveTable");
  const rows = table.tBodies[0].rows;

  Array.from(rows).forEach(row => {
    const cell = row.cells[columnIndex];
    if (cell) {
      const cellText = cell.textContent || cell.innerText;
      row.style.display = cellText.toLowerCase().includes(filter) ? "" : "none";
    }
  });
}

