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

function sayHello(call, callback) {
  callback(null, { message: 'Hello, ' + call.request.name });
}

function main() {
  const server = new grpc.Server();
  server.addService(greeterProto.Greeter.service, { sayHello: sayHello });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
  });
}

main();

