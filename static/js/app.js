// Get the url endpoint
const sample = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// calls function createDropdown when the page starts
createDropdown();

// create function named createDropdown
function createDropdown()
{
 // alert("createdropdown called at page start");
  console.log("creteDropdown called");

  // Fetch the JSON data 
  d3.json(sample).then(function(data) {

      console.log(data);
      console.log("creating drop-down");

      // crete and populate drop-down list
        d3.select("#selDataset")
          .selectAll("option")
          .data(data.names)
          .enter()
          .append("option")
          .text(subjectId => subjectId)
          .attr("value",subjectId => subjectId);  

      console.log("done creating drop-down");

      // call function getMetadat to generate Demographic Info and display it  
      getMetadata(d3.select("#selDataset").property("value"));

      // call function creteBarChart
      createBarChart(d3.select("#selDataset").property("value"));

       // call function createBubbleChart 
      createBubbleChart(d3.select("#selDataset").property("value")) ;
      
  })
  .catch(function(error) {
    console.log("Something wrong!!!");
      console.log(error);
  });
}

// create function named getMetadata 
// subjectId is value such as 940, 941 
function getMetadata(subjectId)
{
  console.log("getMetadata called");
  console.log("getting metadata");

  //retrieve json
  d3.json(sample).then(function(data) {
    console.log(data);

    //clear existing values for #sample-metada tag
    d3.select("#sample-metadata").text("");

    // value is the information set of the selected subjectID
    // value = meta_data.filter(result => result.id == subjectId);
    // "metadata" is the key in json
    let value = data.metadata.filter(result => result.id == subjectId);

    console.log("name  = " + value[0].id);
    console.log("ethnicity  = " + value[0].ethnicity);

    //loop through each key-value pair for metadata
    //and create content for Demographic Info section
    Object.entries(value[0]).forEach(([key, value]) => {
    
      // code to be executed for each property
      d3.select("#sample-metadata")
        .append("h5")
        .text(`${key}: ${value}`);
      
      console.log(`Key: ${key}, Value: ${value}`);

    });
    
  })
  .catch(function(error) {
      console.log(error);
  });

}

// create optionChanged - to call data when select new subjectID
function optionChanged(value)
{
  // alert("optionChanged called when user select new ID");
  console.log("optionChanged called");

  // Log the new value
  console.log("value selected = " + value); 

  // call function getMetadata passing in the selected value
  getMetadata(value);

  // call function createBarChart
  createBarChart(value);

  // call function createBubleChart
  createBubbleChart(value) ;

}

// create function named createBarChart
function createBarChart(subjectID)
{
  console.log("createBarChart called");

  d3.json(sample).then(function(data){
    // pick data for selected id
    let value = data.samples.filter(result => result.id == subjectID);

    console.log (value[0].sample_values);
    console.log(value[0].otu_ids);
    console.log(value[0].sample_values.slice(0,10).reverse());
    console.log(value[0].otu_ids.slice(0,10).reverse().map( otu_id => "OTU " + otu_id));
    console.log(value[0].otu_labels.slice(0,10).reverse());

    let yvalue = value[0].otu_ids.slice(0,10).reverse().map( otu_id => "OTU " + otu_id);
    let xvalue = value[0].sample_values.slice(0,10).reverse();
    let hovertext = value[0].otu_labels.slice(0,10).reverse();

    trace = {
        x: xvalue,
        y: yvalue,
        type: "bar",
        orientation: "h",
        text: hovertext
    }

    traceData = [trace];

    layout = {
        title: "Top 10 OTUs Found In Salmples"
    }

    Plotly.newPlot("bar", traceData, layout);
});
}

// create function named createBubbleChart
function createBubbleChart(subjectID)
{
  console.log("createBubbleChart called");

  d3.json(sample).then(function(data){
    // pick data for selected id
    let value = data.samples.filter(result => result.id == subjectID);

    console.log (value[0].sample_values);
    console.log(value[0].otu_ids);
    console.log(value[0].otu_labels);

    let labelVal = value[0].otu_ids;
    let allVal = value[0].sample_values;
    let hovertext = value[0].otu_labels;

    var trace1 = {
      x: labelVal,
      y: allVal,
      text: hovertext,
      mode: 'markers',
      marker: {
        size: allVal,
        color: labelVal,
        colorscale: "Earth"
      }
    };
    
    var tracedata = [trace1];
    
    var layout = {
     
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {
          title:{
            text: 'OTU ID'
          }
      }
    };

    Plotly.newPlot("bubble", tracedata, layout);
});
}