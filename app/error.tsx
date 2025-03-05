'use client';

import { useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          เกิดข้อผิดพลาด
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          ขออภัย เกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง
        </Typography>
        <Button
          variant="contained"
          onClick={reset}
          sx={{ mt: 2 }}
        >
          ลองใหม่อีกครั้ง
        </Button>
      </Box>
    </Container>
  );
}
