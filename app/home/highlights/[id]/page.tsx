import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';


interface myParams {
    params: {
        id: string,
    }
}
async function getData(id: string) {
    const res = await fetch('https://melivecode.com/api/attractions/'+id)
    if (!res.ok) {
        throw new Error('response was not ok')
    }
    return res.json()
}

export default async function Page({ params }: myParams) {
    const data = await getData(params.id)
    return (
        <Container maxWidth="sm">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{ height: 140 }}
                        height="140"
                        image={data.attraction.coverimage}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.attraction.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {data.attraction.detail}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )
}
