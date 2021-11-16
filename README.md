# Filtered and paginated table of contents

ReactJS application to show a table and populate it through the use of the data published on [https://casupport.viafirma.com/info.json](https://casupport.viafirma.com/info.json)

This table will have four columns
- policyID
- caName
- RelativePath
- Number of elements inside pemFiles.

This table includes pagination in which the data is displayed one hundred rows at a time and will have two filtered columns:
* policyId will have a search filter that will show the results that totally or partially match the text entered.
* relativePath, which will have three combos that will each show us the options available for filtering. Each of these options refers to the environment, area, and country.

## Installation instructions

To start, once the code has been downloaded, use the following command in order to install all the necessary dependencies:
### `npm install`

Once this process is finished and the node-modules folder has been created, using the following command, start the application locally:

### `npm start`

Navigate to [http://localhost:3000](http://localhost:3000) to see the web.