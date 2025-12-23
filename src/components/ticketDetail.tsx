import { useEffect, useState, useRef, useCallback } from "react";
import { addComment, getCommentsByTicketId } from "../services/comment-service";
import { useParams } from "react-router-dom";
import type { CommentResponse } from "../model/comment";
import {  Box, CircularProgress, Fade, Paper, Typography, TextField, IconButton } from "@mui/material";
import {  Send } from "@mui/icons-material";
import { useAuth } from "../context/authContext";
import type { TicketResponse } from "../model/tickets";
import { GetTicketById } from "../services/ticket-service";
import Loader from "./loading";
import MessageBubble from "./MessageBubble";


function TicketDetail() {
    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [sending, setSending] = useState(false);
    const [ticket, setTicket] = useState<TicketResponse | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const context = useAuth();
    const currentUserId = context?.user?.id;

    const isTicketClosed = ticket?.status_id === 2;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const [commentsRes, ticketRes] = await Promise.all([
                    getCommentsByTicketId(id),
                    GetTicketById(Number(id))
                ]);

                setComments(commentsRes.data);
                setTicket(ticketRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSendComment = useCallback(async () => {
        if (!newComment.trim() || !id || isTicketClosed) return;

        setSending(true);
        try {
            await addComment(id, newComment);
            const response = await getCommentsByTicketId(id);
            setComments(response.data);
            setNewComment("");
        } catch (error) {
            console.error("Error sending comment:", error);
        } finally {
            setSending(false);
        }
    }, [newComment, id, isTicketClosed]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendComment();
        }
    };

    if (loading) return <Loader />;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #f8fafc, #e0e7ff)',
                py: 4,
                px: 2,
            }}
        >
            <Fade in timeout={600}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#1e293b',
                            fontWeight: 700,
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            mb: 0.5,
                        }}
                    >
                        שיחת תמיכה - {ticket?.subject}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#64748b',
                            fontSize: '1rem',
                            fontWeight: 500,
                        }}
                    >
                        תיק #{id} | סטטוס: {ticket?.status_name}
                    </Typography>
                </Box>
            </Fade>

            <Paper
                elevation={0}
                sx={{
                    maxWidth: 1000,
                    mx: 'auto',
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.03)',
                }}
            >
                <Box
                    sx={{
                        minHeight: 500,
                        maxHeight: 700,
                        overflowY: 'auto',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        background: '#fafafa',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#cbd5e1',
                            borderRadius: '10px',
                            '&:hover': { background: '#94a3b8' },
                        },
                    }}
                >
                    {comments.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 10 }}>
                            <Typography sx={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                                אין תגובות עדיין
                            </Typography>
                        </Box>
                    ) : (
                        comments.map((comment, index) => ( <MessageBubble 
                                key={comment.id}
                                comment={comment}
                                isCurrentUser={comment.author_id === currentUserId}
                                animationDelay={index * 80}
                            />))
                    )}
                    
                    <div ref={messagesEndRef} />
                </Box>

                <Box
                    sx={{
                        p: 2.5,
                        background: '#ffffff',
                        borderTop: '1px solid #e2e8f0',
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-end',
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        placeholder={isTicketClosed ? "הפניה סגורה, לא ניתן להוסיף תגובות." : "כתוב הודעה..."}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={sending || isTicketClosed}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                background: '#f8fafc',
                                '&:hover fieldset': { borderColor: '#4F46E5' },
                                '&.Mui-focused fieldset': { borderColor: '#4F46E5' },
                            },
                        }}
                    />
                    <IconButton
                        onClick={handleSendComment}
                        disabled={!newComment.trim() || sending || isTicketClosed}
                        sx={{
                            bgcolor: '#4F46E5',
                            color: '#fff',
                            width: 48,
                            height: 48,
                            '&:hover': { bgcolor: '#4338CA' },
                            '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
                        }}
                    >
                        {sending ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : <Send />}
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
}

export default TicketDetail;