document.getElementById('fetchButton').addEventListener('click', async () => {
    const SearchTerm = document.getElementById('SearchTermInput').value;
    const outputElement = document.getElementById('result');

    if (!SearchTerm) {
        outputElement.textContent = 'Please enter a search term.';
        return;
    }

    try {
        const response = await fetch(`https://func-app-powershell001.azurewebsites.net/api/HttpTrigger3?SearchTerm=${encodeURIComponent(SearchTerm)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        // Parse the JSON string to get the array of HTML strings
        const jsonData = JSON.parse(data);


    // Start building the HTML table with the correct structure
    let html = '<table id="myTable" class="display">';
    html += '<thead><tr><th>Title</th><th>Channel</th><th>Published</th><th>Duration</th><th>Url</th></tr></thead><tbody>';

    // Loop over each item in the JSON array and add table rows
    jsonData.forEach(item => {
        html += `<tr>
                    <td>${item.title}</td>
                    <td>${item.Channel}</td>
                    <td>${new Date(item.Published).toLocaleString()}</td>
                    <td>${item.Duration}</td>
                    <td><a href="${item.Url}" target="_blank">${item.Url}</a></td>
                </tr>`;
    });

    // Close the tbody and table HTML
    html += '</tbody></table>';

    // Set the innerHTML of the outputElement to the html string
    outputElement.innerHTML = html;

    } catch (error) {
        console.error('Fetch error:', error);
        outputElement.textContent = 'Error: Could not retrieve data. Check the console for more information.';
    }
});