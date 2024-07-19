const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('greeter.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

function main() {
  const client = new greeterProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
  client.sayHello({ name: 'World' }, (error, response) => {
    if (!error) {
      console.log('Greeting:', response.message);
    } else {
      console.error('Error:', error);
    }
  });
}

main();

