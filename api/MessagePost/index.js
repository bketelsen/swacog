const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
 
const client = new TextAnalyticsClient(
  "<endpoint>",
  new AzureKeyCredential("<API key>")
);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

  const results = await client.analyzeSentiment(documents);
 
  for (const result of results) {
    if (result.error === undefined) {
      console.log("Overall sentiment:", result.sentiment);
      console.log("Scores:", result.confidenceScores); 
    } else {
      console.error("Encountered an error:", result.error);
    }
  }

    if (req.query.message) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a message on the query string"
        };
    }
};