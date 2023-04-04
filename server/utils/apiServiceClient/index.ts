// Responsibilites of this client
/*

This client will have 1 responsilbilites to make a api call

This api call can be of two types.

    1.intra-service-call (grpc)
    2.External call (http or websockets)

    Each type of call have its own method declared with designated enpoints provided by the caller from constants 
    and will be highly decoupled.
    
    Flow of the call
    Client request ---> invoke a api call with necessary parameters (intra-service or external) --->
 */

class APIService {

    grpcCall() {
        console.log('GRPC call');
    }

    httpCall() {
        console.log('HTTP call');
    }
}