import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { ComprehendClient, DetectSentimentCommand, DetectSentimentCommandInput } from '@aws-sdk/client-comprehend';
const comprehendClient = new ComprehendClient({})

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body || '{}');

        const { text } = body;
        if (!text) {
            throw new Error("You need to pass up a field to analyse");
        }

        const res = await analyseSentiment({ text });
        return formatJSONResponse(res)
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message})
        }
    }
}

const analyseSentiment = async ({ text }: {text: string}) => {
    const input: DetectSentimentCommandInput = {
        Text : text,
        LanguageCode: 'en',
    };
    const command = new DetectSentimentCommand(input);
    const response = await comprehendClient.send(command);
    return response
};