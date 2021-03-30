const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
});
const SQS = new AWS.SQS();
const converter = AWS.DynamoDB.Converter;

const getEventRecord = (event) => event.Records[0];

module.exports.handler = async (event) => {
  const record = getEventRecord(event);
  if (record.eventName === 'INSERT') {
    const user = converter.unmarshall(record.dynamodb.NewImage);
    const emailContent = 'Please, confirme you email';
    const message = {
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify({
        emailContent,
        email: user.email,
      }),
    };
    await SQS.sendMessage(message).promise();
  }

  console.log('Sent');
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
