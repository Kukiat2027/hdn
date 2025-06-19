import { Box, Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material';

const merits = [
    { title: 'ปล่อยปลา', img: '/merit1.png' },
    { title: 'ปล่อยเต่า', img: '/merit2.png' },
    { title: 'ปล่อยนก', img: '/merit3.png' },
];

export default function OnlineMerit() {
    return (
        <Box sx={{ my: 6, px: 8 }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                align="center"
                sx={{ color: '#a100e6', mb: 4, fontSize: { xs: 28, md: 40 } }}
            >
                ทำบุญออนไลน์
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {merits.map((item) => (
                    <Grid item xs={12} md={4} key={item.title}>
                        <Card
                            sx={{
                                border: '2px solid #3b82f6',
                                borderRadius: 4,
                                boxShadow: 'none',
                                bgcolor: '#f6f8fd',
                                p: 0,
                                textAlign: 'center',
                                minHeight: 220,
                                transition: '0.2s',
                                overflow: 'hidden',
                                '&:hover': { boxShadow: 3, borderColor: '#a100e6' },
                            }}
                        >
                            <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <CardMedia
                                    component="img"
                                    image={item.img}
                                    alt={item.title}
                                    sx={{
                                        width: '100%',
                                        height: '250px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: 4,
                                        borderTopRightRadius: 4,
                                    }}
                                />
                            </CardActionArea>
                        </Card>
                        <Typography sx={{ fontWeight: 700, fontSize: 22, mt: 2, mb: 2, textAlign: 'center' }}>{item.title}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}