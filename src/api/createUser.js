const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
});
const { v4: uuidv4 } = require('uuid');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  await documentClient.put({
    TableName: process.env.DYNAMODB_USERS,
    Item: {
      id: uuidv4(),
      name: body.name,
      email: body.email,
    },
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Created' }),
  };
};
