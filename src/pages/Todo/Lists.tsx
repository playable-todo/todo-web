import React, { useEffect, useMemo, useState } from 'react'

// Material UI elements
import { 
  Container,
  Grid, 
  Button, 
  Avatar,
  Chip,
  Box,
  Typography 
} from '@mui/material'

import { Request } from '../../helpers/Request';

import TodoSection from '../../components/TodoSection';

import { TodoProps } from './todo.interface';

const Lists = () => {
    // useStates
    const [todo, setTodo] = useState<TodoProps[]>([]);

    // useEffects
    useEffect(() => {
        getTodoFromApi();
    }, [])

    const getTodoFromApi = async() => {
        const url = '/todo/list';
        const result: TodoProps[] | any = await Request({
            method: 'GET',
            url: url
        });

        setTodo(result);
        return result
    }

    return (
      <Container>
        <Grid container>
            <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                <Box 
                  sx={{
                    height: 1,
                    position: 'fixed',
                    backgroundImage: `url('/assets/images/background/nav-bg.png');`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                >
                  <Typography>Side Nav</Typography>
                </Box>
            </Grid> 
            <Grid item xl={10} lg={10} md={10} sm={6} xs={12}>
                {todo.length > 0  && (
                    <TodoSection data={todo} />
                )}
            </Grid> 
        </Grid>
      </Container>
    )
}

export default Lists