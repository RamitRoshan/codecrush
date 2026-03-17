import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    if(location.hostname === "localhost"){
        return io(BASE_URL); 
    }else { //when  we deploy on production. 
        return io("/", {path: "/api/socket.io"});
    }
}

//default path of socket.io is /socket.io, but we are changing it
//  to /api/socket.io because our backend server is running on the same domain 
// as our frontend server, and we want to avoid any conflicts with other routes. 
// By specifying the path as /api/socket.io, we ensure that the socket.io server 
// listens for connections on that specific path, allowing us to have a clear 
// separation between our API routes and our socket.io connections.