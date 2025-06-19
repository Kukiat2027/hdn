import { Box, Typography, Grid } from '@mui/material';

export default function DailyLuckyNumber() {
  return (
    <Box sx={{ mb: 10 }}>
      <Grid container spacing={5} alignItems="stretch" sx={{ backgroundColor: '#f3e6fa' }}>
        <Grid item xs={12} md={5} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%' }}>
            <img
              src="/daily-lucky.png"
              alt="daily lucky"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            p: 4,
            borderRadius: 2,
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: '#a100e6', fontWeight: 700, fontSize: 28, mb: 1 }}>
            เลขเด่นรายวัน (19/06/2568)
          </Typography>
          <Typography sx={{ fontSize: 16, mb: 2 }}>
            By อาจาร์ยกีกี้ คอนเฟริม
          </Typography>
          <Box sx={{ display: 'flex', gap: 8, mb: 1 }}>
            <Typography sx={{ fontWeight: 900, fontSize: 90 }}>20</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 90 }}>39</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 90 }}>49</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 90 }}>00</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 8 }}>
            <Typography sx={{ fontWeight: 900, fontSize: 78 }}>123</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 78 }}>492</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 78 }}>933</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 78 }}>571</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}