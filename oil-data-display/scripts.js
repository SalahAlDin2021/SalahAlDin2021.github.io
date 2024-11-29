let currentColumn = null;  // To store the column currently being filtered
let data = [];  // Store the original data

// Fetch the data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData;
        loadTableData(data);  // Load initial data into the table
    })
    .catch(error => console.error('Error loading the JSON data:', error));

// Function to load data into the table
function loadTableData(filteredData) {
    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = '';  // Clear existing rows

    filteredData.forEach(item => {
        const row = document.createElement('tr');

        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value || '-';
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// Open the modal to filter by column
function openFilterModal(column) {
    currentColumn = column;  // Set the column to be filtered
    const modal = document.getElementById('filter-modal');
    const modalInput = document.getElementById('modal-search-input');
    
    modal.style.display = 'block';  // Show the modal
    modalInput.value = '';  // Clear previous filter input
    modalInput.focus();
}

// Close the filter modal
function closeFilterModal() {
    const modal = document.getElementById('filter-modal');
    modal.style.display = 'none';
}

// Apply the filter based on the modal input
function applyFilter() {
    const filterValue = document.getElementById('modal-search-input').value.toLowerCase();

    // Filter data based on the selected column
    const filteredData = data.filter(item => {
        const fieldValue = item[currentColumn] ? item[currentColumn].toString().toLowerCase() : '';
        return fieldValue.includes(filterValue);
    });

    // Load the filtered data into the table
    loadTableData(filteredData);

    // Close the modal after applying the filter
    closeFilterModal();
}
