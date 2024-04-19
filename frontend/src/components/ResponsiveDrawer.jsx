import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import CreateSlideButton from './CreateSlideButton';
import NextSlideButton from './NextSlideButton';
import SlideNumber from './SlideNumber';
import PrevSlideButton from './PrevSlideButton';
import DeleteSlide from './DeleteSlide';

const drawerWidth = 240;

function ResponsiveDrawer ({ token, presId, slideId, setSlideId, openModal, setAddTextModal, setAddImageModal, setAddVideoModal, setAddCodeModal, slideNumber, slideCount, showNext, showPrev, slideNext, slidePrev, presTitle }) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();

  console.log(isClosing);

  // Function to navigate back to dashboard
  const goBackToDash = () => {
    navigate('/dashboard');
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <CreateSlideButton token={token} presId={presId}></CreateSlideButton>
        {showNext && (
          <NextSlideButton presTitle={presTitle} token={token} presId={presId} slideNext={slideNext} slideId={slideId} setSlideId={setSlideId} style={{ visibility: `${showNext ? 'visible' : 'hidden'}` }}></NextSlideButton>
        )}
        {showPrev && (
          <PrevSlideButton presTitle={presTitle} token={token} presId={presId} slidePrev={slidePrev} slideId={slideId} setSlideId={setSlideId}></PrevSlideButton>
        )}
        <DeleteSlide></DeleteSlide>
        {/* <ListItem key={'Next slide'} disablePadding>
          <ListItemButton onClick={setNextSlideButton}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Next slide'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Prev slide'} disablePadding>
          <ListItemButton onClick={setPrevSlideButton}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Prev slide'} />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem key={'Add Text'} disablePadding>
          <ListItemButton onClick={setAddTextModal}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Add Text'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Add Image'} disablePadding>
          <ListItemButton onClick={setAddImageModal}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Add Image'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Add Video'} disablePadding>
          <ListItemButton onClick={setAddVideoModal}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Add Video'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Add Code'} disablePadding>
          <ListItemButton onClick={setAddCodeModal}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Add Code'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={'Delete Presentation'} disablePadding>
          <ListItemButton onClick={openModal}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Delete Presentation'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Go Back'} disablePadding>
          <ListItemButton onClick={goBackToDash}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Go back'} />
          </ListItemButton>
        </ListItem>
      </List>
      <SlideNumber slideNumber={slideNumber} slideCount={slideCount}>l</SlideNumber>
    </div>
  );

  // // Remove this const when copying and pasting into your project.
  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
