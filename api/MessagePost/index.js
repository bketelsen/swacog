const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const endpoint = process.env["ENDPOINT"];
const apiKey = process.env["APIKEY"]


const client = new TextAnalyticsClient(
  endpoing,
  new AzureKeyCredential(apiKey)
);

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  var documents = [];
  var resultArray = [];

  if (req.query.message) {
    documents.push(req.query.message);
    const results = await client.analyzeSentiment(documents);
    for (const result of results) {
      if (result.error === undefined) {
        resultArray.push(result);
      } else {
        console.error("Encountered an error:", result.error);
      }
    }
  }

  if (req.query.message) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(resultArray)
    };
  }
  else {
    context.res = {
      status: 400,
      body: "Please pass a message on the query string"
    };
  }
};