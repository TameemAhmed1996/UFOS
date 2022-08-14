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

  function HandleClick() {
    // Obtain The Datetime Value From The Filter.
    let Date = D3.select("#DateTime").property("Value");
    let FilteredData = TableData;
  
     // Check If A Date Got Entered And Filter The Data With The Date.
    if (Date) {
    // Apply Filter To Data In The Table And Preserve Rows Only Where DateTime Value Equals Filter Value.
    FilteredData = FilteredData.Filter(Row => Row.DateTime === Date);
  
    // Reconstruct The Table With The Filtered Data. 
    BuildTable(FilteredData);
  }
  }
  
  // Include An Event For Documenting Updates In Each Filter.
  D3.selectAll("#Filter-Btn").on("Click", HandleClick);
  
  // Generate The Table When The Page Loads. 
  BuildTable(TableData);
