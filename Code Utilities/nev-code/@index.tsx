import React, { useEffect, useState } from "react";
import { AssistanceUIEndPoint, ChatHistoryEndPoint } from "Frontend/generated/endpoints";
import { MessageInput, SelectChangeEvent, Button } from "@vaadin/react-components";
import { nanoid } from "nanoid";
import { SplitLayout } from "@vaadin/react-components/SplitLayout";
import MessageList from "Frontend/components/MessageList";
import { MessageItem } from "Frontend/components/Message";
import "@vaadin/icon";
import "@vaadin/icons";
import "@vaadin/notification";
import Layout from "Frontend/layout/layout";
import ChatHistoryEntity from "Frontend/generated/llmproject/entities/ChatHistoryEntity";
import ChatMessageEntity from "Frontend/generated/llmproject/entities/ChatMessageEntity";
import { chat } from "Frontend/generated/AssistanceUIEndPoint";
import { Simulate } from "react-dom/test-utils";
import select = Simulate.select;

export default function Index() {
    const [chatId, setChatId] = useState(nanoid());
    const [working, setWorking] = useState(false);
    const [messages, setMessages] = useState<MessageItem[]>([
        {
            role: "assistant",
            content: "Welcome to Neville - The Nutritionist! How can I help you today?",
            id: ""
        }
    ]);
    const [agent, setAgent] = useState<string | undefined>(undefined);
    const [chatHistories, setChatHistories] = useState<ChatHistoryEntity[]>();
    const [error, setError] = useState<string | null>(null);
    const [refreshHistory, setRefreshHistory] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [chatTitle, setChatTitle] = useState<string>("Neville - The Nutritionist");

    useEffect(() => {
        setRefreshHistory(false);
        ChatHistoryEndPoint.getChatHistories().then((histories) => {
            setChatHistories(histories)
            const selectedChat = histories.find(chatHistory => chatHistory.chatId == chatId);
            if (selectedChat && selectedChat.title) {
                setChatTitle(selectedChat.title);
            }
        }
        );

    }, [chatId]);

    const loadChatHistory = async (chatHistoryId: string) => {
        try {
            setChatId(chatHistoryId);
            const loadedMessages: ChatMessageEntity[] =
                await ChatHistoryEndPoint.getChatHistoryMessages(chatHistoryId);

            setMessages(
                // @ts-ignore
                loadedMessages.map((message: ChatMessageEntity) => ({
                    role: message.messageType?.toLowerCase(),
                    content: message.content,
                    id: message.id
                }))
            );
            setSelectedChatId(chatHistoryId);
        } catch (err) {
            console.error("Error loading chat history:", err);
            setError("Failed to load chat history.");
        }
    };

    // Create a new chat by resetting state
    const newChat = () => {
        const newChatId = nanoid();
        setChatId(newChatId);
        setMessages([
            {
                role: "assistant",
                content: "Welcome to Neville - The Nutritionist! How can I help you today?",
                id: ""
            }
        ]);
        setSelectedChatId(null);
    };

    // Send a new message using the active chatId
    const sendMessage = async (message: string) => {
        if (error) return;

        setWorking(true);
        const messageItemId = nanoid();
        addMessage({ role: "user", content: message, id: messageItemId });


        let first = true;
        AssistanceUIEndPoint.chat(chatId, message, messageItemId, agent)
            .onNext((token) => {
                if (first && token) {
                    addMessage({ role: "assistant", content: token, id: nanoid() });

                    first = false;
                } else {
                    appendToLatestMessage(token);
                }
            })
            .onError(() => setWorking(false))
            .onComplete(() => {
                setWorking(false);
                if (messages.length > 2 && !refreshHistory) {
                    setRefreshHistory(true);

                    ChatHistoryEndPoint.getChatHistories().then((histories) =>
                        setChatHistories(histories)
                    );
                }
            });
    };

    const addMessage = (message: MessageItem) => {
        setMessages((messages) => [...messages, message]);
    };

    const appendToLatestMessage = (chunk: string) => {

        setMessages((messages) => {
            const latestMessage = messages[messages.length - 1];
            latestMessage.content += chunk;
            return [...messages.slice(0, -1), latestMessage];
        });
    };

    if (error) {
        return (
            <SplitLayout className="h-full">
                <div className="flex flex-col gap-m p-m box-border h-full" style={{ width: "100%" }}>
                    {error}
                </div>
            </SplitLayout>
        );
    }

    function onAgentChange(event: SelectChangeEvent) {
        setAgent(event.target.value);
    }

    // ----------------------------------------
    // 2) SPEECH-TO-TEXT (SpeechRecognition)
    // ----------------------------------------
    const startListening = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Browser doesn't support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            sendMessage(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition ended.");
        };

        recognition.start();
    };

    return (
        <Layout>
            <div className="home-wrapper">
                {/* Sidebar with chat histories */}
                <aside className="home__sidebar sidebar-offcanvas">
                    <div className="logo">
                        <img src="/assets/Neville.svg" alt="Neville Logo" />
                        {/*<span className="logo-text">NEVILLE</span>*/}
                    </div>
                    <button className="start-chat-btn" onClick={newChat}>Start New Chat</button>
                    <div className="progress-bar">
                        <div className="progress-bar__label">Today's questions: 3/3</div>
                        <div className="progress-bar__track">
                            <div className="progress-bar__fill" style={{ width: "100%" }} />
                        </div>
                        <div className="progress-bar__labell">⚡ Upgrade Now</div>
                    </div>
                    <div className="history">
                        <div className="section-title">Yesterday</div>
                        {chatHistories?.slice(0, 3).map((chatHistory) => (
                            <div
                                key={chatHistory.chatId}
                                className="question"
                                onClick={() => chatHistory.chatId ? loadChatHistory(chatHistory.chatId) : null}
                                style={{
                                    fontWeight: chatHistory.chatId === selectedChatId ? "bold" : "normal"
                                }}
                            >
                                {chatHistory.title}
                            </div>
                        ))}
                        <div className="section-title">Previous 7 Days</div>
                        {chatHistories?.slice(3).map((chatHistory) => (
                            <div
                                key={chatHistory.chatId}
                                className="question"
                                onClick={() => chatHistory.chatId ? loadChatHistory(chatHistory.chatId) : null}
                            >
                                {chatHistory.title}
                            </div>
                        ))}
                    </div>
                </aside>



                {/* Main chat area */}
                <main className="chat-main">

                    <header className="chat-header">
                        {/* Title, user avatar, actions */}
                        <h3>{chatTitle}</h3>
                        <MessageList
                            messages={messages}
                            loading={working}
                            className="flex-grow overflow-scroll"
                            chatId={chatId}
                        />
                        <MessageInput onSubmit={(e) => sendMessage(e.detail.value)} className="px-0" disabled={working} />
                    </header>
                    <section className="chat-messages">
                        {/* MessageList */}
                    </section>
                    <footer className="chat-input-area">
                        {/* MessageInput */}
                    </footer>
                    <div className="disclaimer">
                        {/* Disclaimer text */}
                        <div className="text-center">
                            <strong>Disclaimer:</strong> Neville is an AI-powered chatbot designed for informational
                            purposes only. Responses should not be considered professional advice.
                        </div>
                    </div>
                </main>

                {/* Main chat area
                <div className="flex flex-col gap-m p-m box-border h-full" style={{ width: "85%" }}>
                </div> */}
            </div>
        </Layout>
    );
}
