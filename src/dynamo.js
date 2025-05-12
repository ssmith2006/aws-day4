import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const doClient = DynamoDBDocumentClient.from(client);

export async function scanTodos() {
  const { Items } = await doClient.send(new ScanCommand({ TableName: "Todo" }));
  return Items || [];
}

export async function createTodo(item) {
  await doClient.send(new PutCommand({ TableName: "Todo", Item: item }));
}
