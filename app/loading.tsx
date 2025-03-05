'use client';

import { Container, CircularProgress, Box } from '@mui/material';

export default function Loading() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
}
