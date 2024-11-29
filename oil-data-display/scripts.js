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
            cell.textContent = value || '-'; // If the value is null or undefined, display '-'
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

    // Function to filter by "رقم الزيت"
    function searchByOilNumber() {
        const searchValue = document.getElementById('search-oil-number').value.trim();  // Get the value of the search input
        
        // Check if search value is not empty
        if (!searchValue) {
            alert("من فضلك أدخل رقم الزيت للبحث"); // Alert if input is empty
            return;
        }

        const filteredData = data.filter(item => {
            // Exact match for "رقم الزيت"
            return item['رقم الزيت'] && item['رقم الزيت'].toString() === searchValue;
        });

        // Log the filtered data count
        console.log(`Filtered data count by رقم الزيت: ${filteredData.length}`);

        // Load the filtered data into the table
        loadTableData(filteredData);
    }

    // Expose the function globally for it to be accessible in the HTML
    window.searchByOilNumber = searchByOilNumber;

// Apply the filter based on the modal input
function applyFilter() {
    const filterValue = document.getElementById('modal-search-input').value.trim().toLowerCase(); // Trim whitespaces

    if (!filterValue) {
        loadTableData(data); // If the filter value is empty, show all data
        closeFilterModal();
        return;
    }

    // Log the filtering column and value
    console.log('Filtering by column: ', currentColumn);
    console.log('Search filter value: ', filterValue);

    // Filter data based on the selected column
    const filteredData = data.filter(item => {
        // Log the entire item object to check its structure
        console.log("Item data:", item);

        // Normalize fieldValue by trimming spaces and converting to lowercase
        const fieldValue = item[currentColumn] ? item[currentColumn].toString().toLowerCase().trim() : '';

        // Log the field value and the search value for debugging
        console.log(`Field value for column ${currentColumn}: "${fieldValue}"`);
        console.log(`Search value: "${filterValue}"`);

        // If it's 'رقم الزيت', apply exact match
        if (currentColumn === 'رقم الزيت') {
            const isExactMatch = fieldValue === filterValue;
            console.log(`Exact match for رقم الزيت: ${isExactMatch}`);
            return isExactMatch;  // Exact match
        } else {
            const containsMatch = fieldValue.includes(filterValue);  // Contains match for other fields
            console.log(`Contains match for column ${currentColumn}: ${containsMatch}`);
            return containsMatch;  // Contains match
        }
    });

    // Log the number of rows found
    console.log(`Filtered data count: ${filteredData.length}`);
    
    // Load the filtered data into the table
    loadTableData(filteredData);

    // Close the modal after applying the filter
    closeFilterModal();
}
