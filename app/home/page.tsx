import React from 'react'
import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Navbar from '@/app/navbar/page'

async function getData() {
    const res = await fetch('https://melivecode.com/api/attractions')
    if (!res.ok) {
        throw new Error('response was not ok')
    }
    return res.json()
}
interface attraction {
    id: number,
    name: string,
    detail: string,
    coverimage: string,

}


export default async function page() {
    const data = await getData()
    // console.log(data)
    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <h1 className="text-3xl font-bold mt-5 mb-4 text-center text-amber-500 ">Attractions</h1>
                <Grid container spacing={2}>
                    {data.map((a: attraction) => (
                        <Grid item xs={12} md={4} key={a.id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 140 }}
                                        height="140"
                                        image={a.coverimage}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {a.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {a.detail}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        <Link href={`/home/${a.id}`}>Learn More</Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
