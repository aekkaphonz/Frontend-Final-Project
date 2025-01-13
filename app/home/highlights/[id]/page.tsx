import React from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Navbar from "@/app/navbar/page"

interface myParams {
    params: {
        id: string,
    }
}
async function getData(id: string) {
    const res = await fetch('https://melivecode.com/api/attractions/' + id)
    if (!res.ok) {
        throw new Error('response was not ok')
    }
    return res.json()
}

export default async function Page({ params }: myParams) {
    const data = await getData(params.id);

    return (
        <>
        <Navbar/>
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Card 
                sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    overflow: 'hidden',
                    backgroundColor: "#f9fbe7", // เพิ่มสีพื้นหลังที่นุ่มนวล
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{ height: 300 }}
                        image={data.attraction.coverimage}
                        alt={data.attraction.name}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h4" component="div" sx={{ color: "#3f51b5", fontWeight: 'bold' }}>
                            {data.attraction.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#616161", mt: 2 }}>
                            {data.attraction.detail}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 2,
                        borderTop: '1px solid #e0e0e0',
                    }}
                >
                    {/* ปุ่มแชร์ */}
                    <Box>
                        <Tooltip title="แชร์">
                            <IconButton sx={{ color: '#3f51b5' }}>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                        {/* ปุ่มเพิ่มในรายการโปรด */}
                        <Tooltip title="เพิ่มในรายการโปรด">
                            <IconButton sx={{ color: '#f50057' }}>
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {/* ปุ่มดำเนินการ */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                        สำรวจเพิ่มเติม
                    </Button>
                </CardActions>
            </Card>
        </Container>
        </>
    )
}
