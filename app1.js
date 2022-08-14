// Import The Data From The Data JS File.

const tableData = data;


// Reference The HTML Table Using D3. 

var tbody = d3.select("tbody");


function buildTable(data) {
    // Clear Existing Data.
    tbody.html("");
  
    // Loop Through Each Object In The Data. Append Rows And Cells For Each Value In A Row.
    data.forEach((dataRow) => {
      // Append A Row To The Body Of The Table.
      let row = tbody.append("tr");
  
      // Loop Through Every Field In DataRow And Add Each Value As A Table Cell (TD).
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

  function handleClick() {
    // Obtain The Datetime Value From The Filter.
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
  
     // Check If A Date Got Entered And Filter The Data With The Date.
    if (date) {
    // Apply Filter To Data In The Table And Preserve Rows Only Where DateTime Value Equals Filter Value.
    filteredData = filteredData.filter(row => row.datetime === date);
  
    // Reconstruct The Table With The Filtered Data. 
    buildTable(filteredData);
  }
  }
  
  // Include An Event For Documenting Updates In Each Filter.
  d3.selectAll("#filter-btn").on("click", handleClick);
  
  // Generate The Table When The Page Loads. 
  buildTable(tableData);
