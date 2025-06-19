"use client"

import { Box, Typography, Grid, Button, CircularProgress, Backdrop } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDreamStore } from '../store/useDreamStore';
import { useDreamDetail } from '../hook/useDreamDetail';

interface DreamResultMainProps {
    keyword?: string;
}

export default function DreamResultMain({ keyword }: DreamResultMainProps) {
    const router = useRouter();
    const setDreamDetail = useDreamStore((s: any) => s.setDreamDetail);
    const { data, isLoading, error } = useDreamDetail(keyword || '');

    useEffect(() => {
        if (data) setDreamDetail(data);

        console.log("data : ", data);

    }, [data, setDreamDetail]);

    return (
        <Box>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                    color: '#a100e6',
                    borderColor: '#a100e6',
                    fontWeight: 700,
                    fontSize: 16,
                    px: 3,
                    py: 1,
                    mb: 2,
                    borderRadius: 2.5,
                    background: '#fff',
                    boxShadow: 'none',
                    textTransform: 'none',
                    transition: '0.2s',
                    '&:hover': {
                        borderColor: '#7a00b3',
                        background: '#f3e6fa',
                        color: '#7a00b3',
                        boxShadow: 'none',
                    },
                }}
                onClick={() => router.push('/')}
            >
                ย้อนกลับ
            </Button>
            <img
                src="/dream-wolf.png"
                alt="dream"
                style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 16, marginBottom: 24 }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                เลขความฝัน
            </Typography>
            {data?.luckyNumber?.length > 0 && <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ color: '#9402D9', fontWeight: 900, fontSize: 220, lineHeight: 1, mr: 8 }}>
                    {data?.luckyNumber?.[0]}
                </Typography>
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 70, color: '#222', mb: 1 }}>
                        {data?.luckyNumber?.[1]} &nbsp; {data?.luckyNumber?.[2]}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 70, color: '#222' }}>
                        {data?.luckyNumber?.[3]} &nbsp; {data?.luckyNumber?.[4]}
                    </Typography>
                </Box>
            </Box>}
            <Typography sx={{ fontWeight: 700, fontSize: 22, mb: 1 }}>
                คุณฝันเห็น "{keyword || '...'}"
            </Typography>
            <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="secondary" />
            </Backdrop>
            {error && <Typography color="error">เกิดข้อผิดพลาดในการค้นหา</Typography>}
            {data && (
                <>
                    <Typography sx={{ mb: 4, fontSize: 18 }}>{data.answer}</Typography>
                    {data.luckyNumber?.length > 0 && <>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>เลขนำโชค</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                            {data.luckyNumber?.map((num: string | number) => (
                                <Box key={num} sx={{ fontWeight: 900, fontSize: 18, color: '#a100e6', bgcolor: '#f3e6fa', px: 3, py: 1, borderRadius: 2 }}>{num}</Box>
                            ))}
                        </Box>
                    </>}
                </>
            )}
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                วิธีสะเดาะเคราะห์ แก้จน
            </Typography>
            <Typography sx={{ mb: 4, fontSize: 18 }}>
                ด้วยความที่ทุ่มเทให้กับงาน และอนาคต ทำให้บางครั้งอาจเผลอละเลยความรักโดยไม่ตั้งใจ ระวังว่าอีกฝ่ายจะรู้สึกโดดเดี่ยว หรือเปิดช่องให้ใครบางคนที่พร้อมจะให้ความใกล้ชิดเข้ามาแทนที่ หากไม่หันกลับมาดูแลกันให้ดี ความเงียบที่เคยดูปกติอาจกลายเป็นช่องว่างที่ขยายตัวจนยากจะแก้ไข ควรหมั่นเติมความหวาน ดูแลความสัมพันธ์ให้มีชีวิตชีวาอยู่เสมอ อย่ามัวแต่คิดว่าอีกฝ่ายจะเข้าใจคุณได้ตลอดไป
                ความรักที่มั่นคงต้องมีทั้งความเชื่อใจ ความเอาใจใส่ และการสื่อสารที่ชัดเจน มือที่สามจะไม่มีที่ยืนได้เลย หากคุณทั้งคู่เลือกที่จะจับมือกันให้แน่น และไม่ปล่อยให้อะไร หรือใครเข้ามาสั่นคลอนความสัมพันธ์ ระวัง และรู้เท่าทันไว้ ไม่ใช่เพื่อระแวง แต่เพื่อปกป้องสิ่งสำคัญที่สุดในหัวใจของคุณ
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                    <img src="/solution1.png" alt="solution1" style={{ width: '100%', borderRadius: 12 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src="/solution2.png" alt="solution2" style={{ width: '100%', borderRadius: 12 }} />
                </Grid>
            </Grid>
        </Box>
    );
}