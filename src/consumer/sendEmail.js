const getEventRecord = (event) => event.Records[0];

module.exports.handler = async (event) => {
  const record = getEventRecord(event);
  const message = JSON.parse(record.body);

  console.log(`Send to: ${message.email}`);
  console.log(`Content to: ${message.emailContent}`);

  console.log('Sent');
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
