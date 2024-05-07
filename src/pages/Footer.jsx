import React from 'react';
import { Link as MaterialLink } from '@mui/material';
import { styled } from '@mui/system';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  textAlign: 'center',
  maxWidth: '100%', // Set maximum width to 100% of the container
  position: 'relative', // Ensure relative positioning
  bottom: 0,
  width: '100%', // Ensure the footer spans the entire width
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
}));

const FooterContent = styled('div')({
  maxWidth: '1200px', // Set a maximum width for the content
  margin: '0 auto', // Center the content horizontally
  padding: '0 20px', // Add padding to the sides
});

function Footer() {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <FooterContent>
        <p>
          Powered by {' '}
          <MaterialLink
            target="_blank"
            rel="noopener"
            color="textSecondary"
          >
             Innaxn
          </MaterialLink>{' '}
          &bull; &copy;{year}
        </p>
        <div>
          <MaterialLink to="" color="inherit">
            FAQ
          </MaterialLink>
          {' | '}
          <MaterialLink
            href=""
            target="_blank"
            color="inherit"
          >
            Terms
          </MaterialLink>
          {' | '}
          <MaterialLink
            href=""
            target="_blank"
            color="inherit"
          >
            Privacy
          </MaterialLink>
        </div>
      </FooterContent>
    </StyledFooter>
  );
}

export default Footer;
