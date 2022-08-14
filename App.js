// Import The Data From The Data JS File.

const TableData = Data;


// Reference The HTML Table Using D3. 

var TBody = D3.select("TBody");


function BuildTable(Data) {
    // Clear Existing Data.
    TBody.html("");
  
    // Loop Through Each Object In The Data. Append Rows And Cells For Each Value In A Row.
    Data.forEach((DataRow) => {
      // Append A Row To The Body Of The Table.
      let Row = TBody.append("TR");
  
      // Loop Through Every Field In DataRow And Add Each Value As A Table Cell (TD).
      Object.values(DataRow).forEach((val) => {
        let Cell = Row.append("TD");
        Cell.text(val);
        }
      );
    });
  }

  // A Variable To Clear Results That Don't Meet Filters Specified.
var clearEntries = D3.select("#Clear-Btn");
clearEntries.on("Click", function() {
  location.reload();
});


// A Variable To Track All Filters As An Object.
var Filters = {
};

// A Function To Update Filters. 
function UpdateFilters() {

    // Store Changed Element As A Variable.
    let inputElement = D3.select(this);

    // Store Changed Value As A Variable.
    let inputValue = inputElement.property("Value");

    // Store Changed ID As A Variable.
    let inputID = inputElement.attr("ID");
  
    // Add A Filter ID And Filter Value To The Filters List If A Filter Value Got Entered Into The Filters List (Otherwise Clear It).

      if (inputValue) {
        Filters[inputID] = inputValue;
    } else{Filters ={};};
  
  
    // A Function For Implementing All Filters And Rebuilding The Table.
    FilterTable(Filters);
};

// A Function For Filtering The Table When The Data Is Implemented.
function FilterTable(Obj) {
  
    // Make The Filtered Data Equal To The Table Data.
    let FilteredData = TableData;
  
    // Loop Through All Filters And Preserve Data That Matches Values Of The Filters.
    
    Object.entries(Obj).forEach(([fkey, fval]) =>{
        
      FilteredData = FilteredData.filter((Row) => Row[fkey] === fval)
          

  });
  
    // Rebuild The Table With The Filtered Data.
    BuildTable(FilteredData);
};
  
  // Include An Event For Documenting Updates In Each Filter.
  D3.selectAll("input").on("Change",UpdateFilters);
  
   // Generate The Table When The Page Loads. 
   BuildTable(TableData);