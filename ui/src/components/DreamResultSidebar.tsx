import { Box, Typography, Avatar, Button, Stack, Card, CardMedia } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const doctors = [
    {
        name: 'อ.พรพิมล',
        code: '703',
        img: '/doctor1.png',
    },
    {
        name: 'ตูตู้พยากรณ์',
        code: '752',
        img: '/doctor2.png',
    },
    {
        name: 'หมอดูเจนนิเฟอร์',
        code: '925',
        img: '/doctor3.png',
    },
];

export default function DreamResultSidebar() {
    return (
        <Box>
            {/* ทริปสายบุญ */}
            <Typography sx={{ color: '#9402D9', fontWeight: 700, fontSize: 20, mb: 2 }}>
                ทริปสายบุญ
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
                <Card>
                    <CardMedia component="img" height="250" image="/trip2.png" alt="trip1" />
                </Card>
                <Card>
                    <CardMedia component="img" height="250" image="/trip3.png" alt="trip2" />
                </Card>
            </Stack>
            {/* หมอแนะนำ */}
            <Box>
                <Typography sx={{ color: '#9402D9', fontWeight: 700, fontSize: 20, mb: 2 }}>
                    หมอดูแนะนำ
                </Typography>
                <Stack spacing={3}>
                    {doctors.map((d, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={d.img} sx={{ width: 100, height: 100, mr: 2 }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#222' }}>
                                    {d.name}
                                </Typography>
                                <Typography sx={{ color: '#ff5722', fontSize: 15, mb: 1 }}>
                                    รหัส {d.code}
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<PhoneIcon />}
                                    sx={{
                                        bgcolor: '#19c900',
                                        color: '#fff',
                                        fontWeight: 700,
                                        borderRadius: 999,
                                        px: 2.5,
                                        py: 0.5,
                                        fontSize: 16,
                                        minWidth: 0,
                                        boxShadow: 1,
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#0e8c00' },
                                    }}
                                >
                                    จองคิว
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}