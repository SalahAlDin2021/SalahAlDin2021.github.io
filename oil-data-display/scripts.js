// Fetch the data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Function to load data into the table
        function loadTableData(data) {
            const tableBody = document.getElementById('data-body');
            tableBody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');

                Object.values(item).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value || '-';
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        }

        // Call the function to load the data initially
        loadTableData(data);

        // Search functionality
        window.searchData = function() {
            const searchValue = document.getElementById('search').value.toLowerCase();
            const filteredData = data.filter(item => {
                return Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(searchValue)
                );
            });
            loadTableData(filteredData);
        };
    })
    .catch(error => console.error('Error loading the JSON data:', error));
