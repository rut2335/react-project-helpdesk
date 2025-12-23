import { Avatar, Box, Fade, Paper, Typography } from "@mui/material";
import type { CommentResponse } from "../model/comment";
import { Schedule } from "@mui/icons-material";

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

interface MessageBubbleProps {
    comment: CommentResponse;
    isCurrentUser: boolean;
    animationDelay: number;
}

const MessageBubble = ({ comment, isCurrentUser, animationDelay }: MessageBubbleProps) => {
    return (
        <Fade in key={comment.id} timeout={400} style={{ transitionDelay: `${animationDelay}ms` }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                    gap: 1.5,
                    alignItems: 'flex-start',
                }}
            >
                {!isCurrentUser && (
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#64748b',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        {getInitials(comment.author_name)}
                    </Avatar>
                )}

                <Box sx={{ maxWidth: '65%', minWidth: '200px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 0.75,
                            justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Typography sx={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>
                            {comment.author_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Schedule sx={{ fontSize: 12, color: '#94a3b8' }} />
                            <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                                {new Date(comment.created_at).toLocaleDateString('he-IL', {
                                    day: '2-digit', month: '2-digit', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit',
                                })}
                            </Typography>
                        </Box>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            background: isCurrentUser ? '#f0f4ff' : '#ffffff',
                            borderRadius: isCurrentUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            boxShadow: isCurrentUser ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
                            border: isCurrentUser ? '1px solid #4F46E520' : '1px solid #f1f5f9',
                        }}
                    >
                        <Typography sx={{ color: '#1e293b', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            {comment.content}
                        </Typography>
                    </Paper>
                </Box>

                {isCurrentUser && (
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#4F46E5',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                        }}
                    >
                        {getInitials(comment.author_name)}
                    </Avatar>
                )}
            </Box>
        </Fade>
    );
}

export default MessageBubble