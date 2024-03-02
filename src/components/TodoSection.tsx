import React, { useState, Fragment } from 'react'

import { 
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Avatar
} from '@mui/material';


// İnterfaces
import { TodoSectionProp } from './component';

const TodoSection: React.FC<TodoSectionProp> = ({ data }) => {
    const EndPoint = import.meta.env.VITE_ENDPOINT;

    return (
        <Grid container spacing={3}>
            {data.length > 0 && data.map((item, key) => (
                <Grid item={true} lg={6} xl={6} md={6} sm={6} xs={12} key={key}>
                    <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: '16px', fontWeight: 600, marginBottom: 1 }}>
                                     {item.title}
                                </Typography>
                                <Typography sx={{ fontSize: '16px', marginBottom: 1 }}>
                                     {item.content}
                                </Typography>
                                {item?.image !== null  && (
                                    <Box sx={{ display: 'inline-flex' }}>
                                        <Avatar 
                                            src={EndPoint + item?.image?.url}  
                                            sx={{ width: 40, marginRight: '5px', border: '2px solid #7c4b00' }}
                                        />
                                    </Box>
                                )}
                            </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )

}

export default TodoSection