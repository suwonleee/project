import { Box } from '@mui/material';
import React from 'react';

const NotFound = () => {
    return (
        <Box 
            className="flex justify-center items-center" 
            sx={{ bgcolor: 'black' , color: 'white', display: 'flex', height: '1000px'
        }}>
            404 Error
        </Box>
    );
};
export default NotFound;