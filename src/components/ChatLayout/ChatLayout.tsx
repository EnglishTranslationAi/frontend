import React from 'react';
import {MessagesProvider} from "@/utils/useMessage";
import MessagesList from "@/components/MessageList/MessageList";
import MessageForm from "@/components/MessageForm/MessageForm";

const ChatLayout = () => {
    return (
        <MessagesProvider>
            <MessagesList />
            <div className="fixed bottom-0 right-0 left-0">
                <MessageForm />
            </div>
        </MessagesProvider>
    );
};


export default ChatLayout;

