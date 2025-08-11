
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, Mic, Send, X, Loader2 } from 'lucide-react';
import { KhelwapasLogo } from '../icons/khelwapas-logo';
import { cn } from '@/lib/utils';
import { chatWithKhelbot } from '@/ai/flows/khelbot-chat';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Message = {
    role: 'user' | 'model';
    content: string;
};

type HistoryItem = {
    role: 'user' | 'model';
    content: { text: string }[];
}

export default function KhelbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isOpen && messages.length === 0) {
            setMessages([{ role: 'model', content: "Hi! I'm KhelBot. How can I help you today? You can ask me about selling, buying, or tracking your order." }]);
        }
    }, [isOpen, messages.length]);

     useEffect(() => {
        // Auto-scroll to the bottom when new messages are added
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // We need to format the history for the Genkit flow
            const historyForApi: HistoryItem[] = messages.map(msg => ({
                role: msg.role,
                content: [{ text: msg.content }]
            }));

            const response = await chatWithKhelbot({
                message: input,
                history: historyForApi
            });
            const modelMessage: Message = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("KhelBot Error:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having a little trouble right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TooltipProvider>
            <div className="fixed bottom-6 right-6 z-50">
                <div className={cn("transition-opacity duration-300", isOpen ? "opacity-0 pointer-events-none" : "opacity-100")}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90"
                                onClick={() => setIsOpen(true)}
                                aria-label="Open KhelBot"
                            >
                                <MessageSquare className="h-8 w-8" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Need help? Ask KhelBot!</p>
                        </TooltipContent>
                    </Tooltip>
                </div>


                <Card className={cn(
                    "w-[380px] h-[600px] shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right",
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                )}>
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-3">
                            <KhelwapasLogo className="w-10 h-10" />
                            <div>
                                <h3 className="font-headline font-semibold">KhelBot</h3>
                                <p className="text-xs text-muted-foreground">AI Support</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 flex flex-col">
                        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div key={index} className={cn(
                                        "flex gap-3 items-end",
                                        message.role === 'user' ? "justify-end" : "justify-start"
                                    )}>
                                        {message.role === 'model' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>K</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn(
                                            "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap",
                                            message.role === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}>
                                            {message.content}
                                        </div>
                                         {message.role === 'user' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                                {loading && (
                                     <div className="flex gap-3 items-end justify-start">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>K</AvatarFallback>
                                        </Avatar>
                                        <div className="rounded-lg px-4 py-2 bg-muted">
                                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t">
                             <div className="grid grid-cols-4 gap-2 mb-2">
                                <Button variant="outline" size="sm" className="text-xs">Sell Help</Button>
                                <Button variant="outline" size="sm" className="text-xs">Track Order</Button>
                                <Button variant="outline" size="sm" className="text-xs">Payments</Button>
                                <Button variant="outline" size="sm" className="text-xs">Report Issue</Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon">
                                    <Mic className="h-5 w-5" />
                                </Button>
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a question..."
                                    disabled={loading}
                                />
                                <Button onClick={handleSend} disabled={loading || !input.trim()}>
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    );
}
