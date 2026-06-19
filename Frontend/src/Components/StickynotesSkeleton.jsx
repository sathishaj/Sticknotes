import { Skeleton, IconButton, Divider, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StickyNotesSkeleton = () => {
    return (
        <Box
            sx={{
                width: 288, // Tailwind w-72
                height: 256, // Tailwind h-64
                backgroundColor: '#F2F2F2', // fallback yellow note color
                borderRadius: 6,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            {/* Date & Menu */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Skeleton variant="text" width={80} height={20} />
                <IconButton size="small">
                    <MoreHorizIcon />
                </IconButton>
            </Box>

          
            <Skeleton variant="text" width="70%" height={28} />

            <Divider />

           
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
        </Box>
    );
};

export default StickyNotesSkeleton;
