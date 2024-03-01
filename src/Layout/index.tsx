import React from 'react'

// material ui elements
import { Box, Nav, Main } from '@mui/material';

// Layout Components
import Navbar from './Navbar';
import SideNav from './SideNav';

// interface
import { LayoutProps } from './layout';

const Layout = (props: LayoutProps) => {

return (
  <React.Fragment>
      <Navbar />
      <div>{props.children}</div>
  </React.Fragment>
)
}

export default Layout