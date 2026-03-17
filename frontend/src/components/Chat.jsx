import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import {useSelector} from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {

    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([ ]);
    const [newMessage, setNewMessage]= useState("");

    const user = useSelector(store => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true, // to send cookies with the request, which is necessary for authentication.
        });

        console.log(chat.data.messages);

        const chatMessages  = chat?.data?.messages.map((msg) => {
            return {
                firstName: msg?.senderId?.firstName,
                lastName: msg?.senderId?.lastName,
                text: msg.text,
            }
        });

        setMessages(chatMessages);

    };
    useEffect(() => {
        fetchChatMessages();
    }, []);


    //ASA our page loads, we have to connect to the server.
    useEffect(() => {
        if(!userId) return; //if userId is not available, we cannot establish a socket connection, so we return early.
            
        const socket = createSocketConnection();
        // as soon as  the page loaded, the socket connection is made and joinChat event is emitted to the server with the userId and targetUserId as payload.
        socket.emit("joinChat", {firstName: user.firstName, userId, targetUserId});

        socket.on("messageReceived", ({firstName, lastName, text}) => {
            console.log(firstName + " " + text);
            setMessages((messages) => [...messages, {firstName, lastName, text}]);
        });

        //cleanup function to disconnect the socket connection when the component unmounts.
        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]); //when userId changes, the effect will re-run and establish a new socket connection with the updated userId.

     
    const sendMessage = () => {

        // we use this createSocketConnection function to create a new socket connection and then emit the sendMessage event to the server with the message details as payload.
        const socket = createSocketConnection();
        socket.emit("sendMessage", { 
            firstName: user.firstName,
            lastName: user.lastName,
            userId, 
            targetUserId, 
            text: newMessage 
        });
        setNewMessage("");
        
    }
    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-t border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {/* display messages */}
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className={"chat" + (user.firstName === msg.firstName ? " chat-end" : " chat-start")}>
                            <div className="chat-header">
                                {`${msg.firstName} ${msg.lastName}`}
                                <time className="text-xs opacity-50">2 hour ago</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    );
                })}
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input 
                  className="flex-1 border border-gray-500 text-white rounded p-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></input>
                <button 
                  onClick={sendMessage}
                  className="btn btn-secondary"
                  >Send</button>
            </div>
        </div>
    )
};

export default Chat;