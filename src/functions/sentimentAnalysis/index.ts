import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";

export const handler =async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body || '{}');

        const { text } = body;
        if (!text) {
            throw new Error("You need to pass up a field to analyse");
        }

        const res = await analyseSentiment({ text });
        return formatJSONResponse(res)
        return formatJSONResponse({ message: "test"})
        
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message})
        }
    }
}

const analyseSentiment = async ({ text }: {text: string}) => {
    return {
        textAnalyed: text,
        result: 'fake'
    }
};