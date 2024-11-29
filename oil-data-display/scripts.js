// Fetch the data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Function to load data into the table
        function loadTableData(filteredData) {
            const tableBody = document.getElementById('data-body');
            tableBody.innerHTML = ''; // Clear existing rows

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

        // Call the function to load the data initially
        loadTableData(data);

        // Function to filter the data based on each column-specific filter
        window.searchData = function() {
            const filters = {
                رقم_الزيت: document.getElementById('filter-رقم-الزيت').value.toLowerCase(),
                المرسل: document.getElementById('filter-المرسل').value.toLowerCase(),
                القرية_المدينة: document.getElementById('filter-القرية-المدينة').value.toLowerCase(),
                تلفون_المرسل: document.getElementById('filter-تلفون-المرسل').value.toLowerCase(),
                المستلم: document.getElementById('filter-المستلم').value.toLowerCase(),
                المدينة_الولاية: document.getElementById('filter-المدينة-الولاية').value.toLowerCase(),
                تلفون1_المستلم: document.getElementById('filter-تلفون1-المستلم').value.toLowerCase(),
                الكمية: document.getElementById('filter-الكمية').value.toLowerCase(),
                زيت: document.getElementById('filter-زيت').value.toLowerCase(),
                زيتون: document.getElementById('filter-زيتون').value.toLowerCase(),
                المبلغ: document.getElementById('filter-المبلغ').value.toLowerCase(),
                شيقل: document.getElementById('filter-شيقل').value.toLowerCase(),
                دولار: document.getElementById('filter-دولار').value.toLowerCase(),
                دينار: document.getElementById('filter-دينار').value.toLowerCase(),
                رقم_المشتاح: document.getElementById('filter-رقم-المشتاح').value.toLowerCase()
            };

            // Filter the data based on each field's filter value
            const filteredData = data.filter(item => {
                return Object.keys(filters).every(field => {
                    const fieldValue = item[field] ? item[field].toString().toLowerCase() : '';
                    return fieldValue.includes(filters[field]);
                });
            });

            // Update the table with filtered data
            loadTableData(filteredData);
        };
    })
    .catch(error => console.error('Error loading the JSON data:', error));
