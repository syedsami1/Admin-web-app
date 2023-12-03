document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndRenderUI();
});

// Fetch data from the API endpoint and render the UI
function fetchDataAndRenderUI() {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => response.json())
        .then(data => {
            renderUI(data, 1); // Render the initial UI with the first page
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to render the table rows
function renderTableRows(data, currentPage, rowsPerPage) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const tableBody = document.getElementById('row-container');
    tableBody.innerHTML = '';

    paginatedData.forEach(user => {
        const row = createRow(user);
        tableBody.appendChild(row);
    });

    renderPaginationButtons(data, currentPage, rowsPerPage);
}

// Function to create a table row
function createRow(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
            <button class="edit-button" onclick="editRow('${user.id}')">Edit</button>
            <button class="delete-button" onclick="deleteRow('${user.id}')">Delete</button>
        </td>
    `;
    return row;
}

// Function to render pagination buttons
function renderPaginationButtons(data, currentPage, rowsPerPage) {
    const totalPages = Math.ceil(data.length / rowsPerPage);

    document.getElementById('page-indicator').innerText = `Page ${currentPage} of ${totalPages}`;

    const firstButton = document.getElementById('first');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const lastButton = document.getElementById('last');

    firstButton.disabled = currentPage === 1;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    lastButton.disabled = currentPage === totalPages;

    firstButton.onclick = () => renderTableRows(data, 1, rowsPerPage);
    prevButton.onclick = () => renderTableRows(data, currentPage - 1, rowsPerPage);
    nextButton.onclick = () => renderTableRows(data, currentPage + 1, rowsPerPage);
    lastButton.onclick = () => renderTableRows(data, totalPages, rowsPerPage);
}

// Function to handle search
function handleSearch(data) {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredData = data.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    renderUI(filteredData, 1);
}

// Function to edit a row
function editRow(userId) {
    // Implement your logic to edit the row
    console.log('Edit:', userId);
}

// Function to delete a row
function deleteRow(userId) {
    // Implement your logic to delete the row
    console.log('Delete:', userId);
}

// Function to render the UI with data
function renderUI(data, currentPage) {
    const rowsPerPage = 5;
    renderTableRows(data, currentPage, rowsPerPage);
}

// Event listener for the search bar
document.getElementById('searchBar').addEventListener('keyup', () => handleSearch(data));
