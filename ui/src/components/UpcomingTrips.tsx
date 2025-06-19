import { Box, Typography, Grid, Button, Card, CardMedia } from '@mui/material';

const trips = [
  {
    title: '01-15 MAY 2025',
    desc: 'เข้าวัดทำบุญ มุ่งขาวห่มขาว ขัดเกลาจิตใจ',
    img: '/trip1.png',
    highlight: true,
    cta: 'Join Now',
  },
  {
    title: '9 ทริปเที่ยวสายบุญ',
    img: '/trip2.png',
    highlight: false,
  },
  {
    title: '10 ทริปสายบุญ',
    img: '/trip3.png',
    highlight: false,
  },
];

export default function UpcomingTrips() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        sx={{ color: '#a100e6', mb: 4, fontSize: { xs: 28, md: 40 } }}
      >
        ทริปสายบุญที่กำลังจะมาถึง
      </Typography>
      <Grid container spacing={3}>
        {/* รูปใหญ่ซ้าย */}
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'relative', height: 600, borderRadius: 3, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={trips[0].img}
              alt={trips[0].title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* ข้อความทับบนรูป */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pl: { xs: 3, md: 6 },
                zIndex: 2,
                background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.05) 100%)',
              }}
            >
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, fontSize: { xs: 28, md: 40 } }}>
                {trips[0].title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {trips[0].desc}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#a100e6',
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  width: 150,
                  fontSize: 14,
                  boxShadow: 2,
                  '&:hover': { bgcolor: '#7a00b3' },
                }}
              >
                {trips[0].cta}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* รูปเล็กขวา 2 รูป */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction="column" sx={{ height: 620 }}>
            <Grid item xs={6} sx={{ height: 180 }}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={trips[1].img}
                  alt={trips[1].title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Card>
            </Grid>
            <Grid item xs={6} sx={{ height: 180 }}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                <CardMedia
                  component="img"
                  image={trips[2].img}
                  alt={trips[2].title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}