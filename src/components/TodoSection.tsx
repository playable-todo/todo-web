import React, { useState, Fragment } from 'react'

import { 
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';


// İnterfaces
import { TodoSectionProp } from './component';

const TodoSection: React.FC<TodoSectionProp> = ({ data }) => {

    return (
        <>
            {data.length > 0 && data.map((item, key) => (
                <Grid item={true} lg={6} xl={6} md={6} sm={6} xs={12} key={key}>
                    <Card variant="outlined">
                            <CardContent>
                            
                            </CardContent>
                            <CardActions disableSpacing sx={{ display: 'block', backgroundColor: '#f4f4f4' }}>

                            </CardActions>
                    </Card>
                </Grid>
            ))}
        </>
    )

}

export default TodoSection