exports.handler = async function name(event : AWSLambda.APIGatewayEvent) {
    console.log("event: " , JSON.stringify(event, null , 2))
    return {
        statusCode: 200,
        headers:{"Content-Type" : "text/plain"},
        body: `Hello , world! ${event.path}`
    }
}