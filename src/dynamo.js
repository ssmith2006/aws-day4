import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "Todo";

export async function scanTodos() {
  const { Items } = await docClient.send(
    new ScanCommand({ TableName: "Todo" })
  );
  return Items || [];
}

export async function createTodo(todo) {
  await docClient.send(new PutCommand({ TableName: TABLE, Item: todo }));
}
export async function deleteTodo(id) {
  await docClient.send(new DeleteCommand({ TableName: TABLE, Key: { id } }));
}

export async function updateTodo(id, updates) { 
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "SET #done = :val",
      ExpressionAttributeNames: { "#done": "completed " },
      ExpressionAttributeValues: { ":val": updates },
    })
  );
}
