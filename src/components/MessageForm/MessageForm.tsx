'use client'
import { useState } from 'react';
import { useMessages } from "@/utils/useMessage";
import styles from "./messageForm.module.scss";

const MessageForm = () => {
    const [content, setContent] = useState('');
    const { addMessage } = useMessages();

    const handleSubmit = async (e) => {
        e.preventDefault();
        addMessage(content);
        setContent('');
    };

    return (
        <form className={styles.messageFormContainer} onSubmit={handleSubmit}>
            <div className={styles.formContent}>
                <label htmlFor="content" className="sr-only">
                    Your message
                </label>
                <textarea
                    name="content"
                    placeholder="Enter your message here..."
                    rows={3}
                    value={content}
                    autoFocus
                    className={styles.textarea}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className={styles.submitButton}>
                    <button type="submit">
                        Send
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={styles.sendIcon}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default MessageForm;
