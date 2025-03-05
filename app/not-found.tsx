'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

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
          404 - ไม่พบหน้าที่คุณต้องการ
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/')}
          sx={{ mt: 2 }}
        >
          กลับหน้าหลัก
        </Button>
      </Box>
    </Container>
  );
}
