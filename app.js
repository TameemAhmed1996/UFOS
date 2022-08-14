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

  // A Variable To Clear Results That Don't Meet Filters Specified.
var clearEntries = d3.select("#clear-btn");
clearEntries.on("click", function() {
  location.reload();
});


// A Variable To Track All Filters As An Object.
var filters = {
};

// A Function To Update Filters. 
function updateFilters() {

    // Store Changed Element As A Variable.
    let inputElement = d3.select(this);

    // Store Changed Value As A Variable.
    let inputValue = inputElement.property("value");

    // Store Changed ID As A Variable.
    let inputID = inputElement.attr("id");
  
    // Add A Filter ID And Filter Value To The Filters List If A Filter Value Got Entered Into The Filters List (Otherwise Clear It).

      if (inputValue) {
        filters[inputID] = inputValue;
    } else{filters ={};};
  
  
    // A Function For Implementing All Filters And Rebuilding The Table.
    filterTable(filters);
};

// A Function For Filtering The Table When The Data Is Implemented.
function filterTable(obj) {
  
    // Make The Filtered Data Equal To The Table Data.
    let filteredData = tableData;
  
    // Loop Through All Filters And Preserve Data That Matches Values Of The Filters.
    
    Object.entries(obj).forEach(([fkey, fval]) =>{
        
      filteredData = filteredData.filter((row) => row[fkey] === fval)
          

  });
  
    // Rebuild The Table With The Filtered Data.
    buildTable(filteredData);
};
  
  // Include An Event For Documenting Updates In Each Filter.
  d3.selectAll("input").on("change",updateFilters);
  
   // Generate The Table When The Page Loads. 
   buildTable(tableData);