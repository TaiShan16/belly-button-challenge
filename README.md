## belly-button-challenge

In this project, we built an interactive dashboard to explore the Belly Button Biodiversity, which catalogs the microbes that colonize human navels. We retrieve the dataset from: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

According to the information from the dataset, a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

In order to create the dashboard for displaying microbes collected from each test subject, we use D3 library to read the dataset from the URL above. We then retrieved metadata information and display it under 'Demographic Info' on the dashboard. For data visualization, we created a horizontal bar chart and a bubble chart. Once the dropdown menu was selected for a specific sample ID, the horizontal bar chart will display the top 10 OTUs found of that sample ID, while the bubble chart will display the OTU_ID (microbes ID) and its sample value that collected from each sample.

### Data Source:
http://robdunnlab.com/projects/belly-button-biodiversity/

