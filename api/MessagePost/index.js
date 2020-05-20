var mod = require("@azure/cognitiveservices-contentmoderator");
var msr = require("@azure/ms-rest-azure-js");


const contentModeratorKey = process.env["APIKEY"];
const contentModeratorEndPoint = process.env["ENDPOINT"];
const cognitiveServiceCredentials = new msr.CognitiveServicesCredentials(contentModeratorKey);

const client = new mod.ContentModeratorClient(
  cognitiveServiceCredentials,
  contentModeratorEndPoint
);


module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  var response = {}
  if (req.query.message) {
    console.log("got a message:", req.query.message);
    await client.textModeration
      .screenText("text/plain", req.query.message)
      .then((result) => {
        if (result.terms) {
          response = {
            status: "FAIL",
            terms: result.terms.length
          }
        } else {
          response = {
            // status: 200, /* Defaults to 200 */
            status: "OK"
          };
          /*
          fetch(`https://rover.brian.dev?${req.query.message}`)
            .then(result => result.json())
            .then(data => {
              console.log(data);
            });
            */
        }
      })
      .catch((err) => {
        console.log(err);
        response = {
          status: 400,
          body: "Please pass a message on the query string"
        };
      });

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: { response }
    };
  } else {

    console.log("no params");
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: { status: "No Input" }
    };
  }
  context.done()
};