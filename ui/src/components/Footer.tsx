// src/components/Footer.tsx
import { Box, Typography, Button, Grid, Stack, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    return (
        <Box sx={{ bgcolor: '#a100e6', color: '#fff', py: 8, px: { xs: 2, md: 8 }, mt: 10 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                {/* ซ้าย */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, textAlign: 'center' }}>
                        บ้านปูทำนายฝัน
                    </Typography>
                    <Typography sx={{ mb: 3, fontSize: 18, textAlign: 'center' }}>
                        บริการตลอด 24 ชั่วโมง
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#19c900',
                            color: '#fff',
                            fontWeight: 700,
                            borderRadius: 999,
                            px: 4,
                            py: 1.5,
                            fontSize: 20,
                            boxShadow: 1,
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#0e8c00' },
                            mb: 0,
                        }}
                    >
                        Add Friend
                    </Button>
                </Grid>
                {/* กลาง */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <MuiLink href="#" underline="none" color="#fff" sx={{ fontSize: 16, textAlign: 'center' }}>
                            ค้นหาความฝัน
                        </MuiLink>
                        <MuiLink href="#" underline="none" color="#fff" sx={{ fontSize: 16, textAlign: 'center' }}>
                            ทริปสายบุญ
                        </MuiLink>
                        <MuiLink href="#" underline="none" color="#fff" sx={{ fontSize: 16, textAlign: 'center' }}>
                            ดูดวงออนไลน์
                        </MuiLink>
                        <MuiLink href="#" underline="none" color="#fff" sx={{ fontSize: 16, textAlign: 'center' }}>
                            ร่วมบริจาคบุญ
                        </MuiLink>
                    </Stack>
                </Grid>
                {/* ขวา */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography fontWeight="bold" sx={{ mb: 2, fontSize: 22, textAlign: 'center' }}>
                        Follow Us
                    </Typography>
                    <Stack direction="row" spacing={4} justifyContent="center">
                        <MuiLink href="#" color="#fff"><FacebookIcon sx={{ fontSize: 40 }} /></MuiLink>
                        <MuiLink href="#" color="#fff"><InstagramIcon sx={{ fontSize: 40 }} /></MuiLink>
                        <MuiLink href="#" color="#fff"><LinkedInIcon sx={{ fontSize: 40 }} /></MuiLink>
                        <MuiLink href="#" color="#fff"><TwitterIcon sx={{ fontSize: 40 }} /></MuiLink>
                        <MuiLink href="#" color="#fff"><YouTubeIcon sx={{ fontSize: 40 }} /></MuiLink>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}