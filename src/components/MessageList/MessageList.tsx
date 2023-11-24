'use client'
import { useMessages } from "@/utils/useMessage";
import { extractUserText } from "@/helpers/extractUserText";
import Image from "next/image";
import styles from "./messageList.module.scss";
import robot from "../../app/ai.png";
import gfm from 'remark-gfm';
import ReactMarkdown from "react-markdown";

const MessagesList = () => {
    const { messages, isLoadingAnswer } = useMessages();

    return (
        <div className={styles.messageContainer}>
            {messages?.map((message, i) => {
                const isUser = message.role === 'user';
                if (message.role === 'system') return null;

                return (
                    <div
                        id={`message-${i}`}
                        className={`${styles.message} ${isUser ? styles.user : styles.system} ${i === 1 ? styles.maxWidthMd : ''}`}
                        key={message.content}
                    >
                        {!isUser && (
                            <Image
                                src={robot}
                                className={styles.avatar}
                                alt="avatar"
                                width={36}
                                height={36}
                            />
                        )}
                        <div className={`${styles.messageContent} ${isUser ? styles.user : styles.system}`}>
                            {isUser
                                ?
                                extractUserText(message.content.trim())
                                :
                                <ReactMarkdown
                                    remarkPlugins={[gfm]}
                                >
                                    {message.content.trim()}
                                </ReactMarkdown>

                            }
                        </div>
                        {isUser && (
                            <img
                                src="https://www.teamsmart.ai/next-assets/profile-image.png"
                                className={styles.avatar}
                                alt="avatar"
                            />
                        )}
                    </div>
                );
            })}
            {isLoadingAnswer && (
                <div className={styles.loader}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
        </div>
    );
};

export default MessagesList;
