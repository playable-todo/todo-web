import React from 'react'

// Material UI elements
import { 
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    useTheme,
    Chip
} from '@mui/material';

import { todoSectionStyles } from '../styles';

// İnterfaces
import { TodoSectionProp } from './component';

const TodoSection: React.FC<TodoSectionProp> = ({ data, handleTodoOpen }) => {
    // Material UI settings
    const theme = useTheme();

    // ENV
    const EndPoint = import.meta.env.VITE_ENDPOINT;

    return (
        <Grid container spacing={3}>
            {data.length > 0 && data.map((item, key) => (
                <Grid item={true} lg={6} xl={6} md={6} sm={6} xs={12} key={key}>
                    <Card 
                        variant="outlined" 
                        sx={{
                            ':hover': {
                                outline: '2px solid' + theme.palette.warning.main
                            }
                        }}
                        onClick={() => handleTodoOpen(item)}
                    >
                        <CardContent>
                            <Typography sx={todoSectionStyles.cardContentTitle}>
                                    {item.title}
                            </Typography>
                            <Typography sx={todoSectionStyles.cardContent}>
                                    {item.content}
                            </Typography>
                            {item?.image !== null  && (
                                <Box sx={todoSectionStyles.cardImageBox}>
                                    <Avatar 
                                        src={EndPoint + item?.image?.url}  
                                        sx={todoSectionStyles.cardImage}
                                    />
                                </Box>
                            )}
                        </CardContent>
                        {item.tag_name && (
                            <CardActions>
                                <Chip label={item.tag_name} />
                            </CardActions>
                        )}
                    </Card>
                </Grid>
            ))}
        </Grid>
    )

}

export default TodoSection