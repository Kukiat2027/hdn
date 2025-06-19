'use client';
import { Box, Typography, Paper, InputBase, Button, Chip, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeHero() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      router.push(`/dream/${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 600,
        backgroundImage: 'url(/banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 6,
        position: 'relative',
      }}
    >
      {/* Overlay for readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(56, 0, 106, 0.55)',
        zIndex: 1,
      }} />
      {/* โลโก้และชื่อ */}
      <Box sx={{ mb: 2, mt: 4, position: 'relative', zIndex: 2 }}>
        <img src="/logo.png" alt="logo" style={{ width: 400, marginRight: 12 }} />
      </Box>
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          p: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          width: 900,
          maxWidth: '98%',
          mt: 2,
          borderRadius: 3,
          position: 'relative',
          zIndex: 2,
          boxShadow: 3,
        }}
      >
        {/* ปุ่ม "ตามหาฝัน" + ขีดม่วง */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Button
            variant="text"
            sx={{
              color: '#222',
              fontWeight: 700,
              fontSize: 18,
              px: 0,
              minWidth: 0,
              '&:after': {
                content: '""',
                display: 'block',
                height: 24,
                width: 3,
                background: '#8f2fff',
                borderRadius: 2,
                position: 'absolute',
                right: -12,
                top: '50%',
                transform: 'translateY(-50%)',
              },
              position: 'relative',
            }}
            disableRipple
          >
            ตามหาฝัน
          </Button>
        </Box>
        {/* ช่องกรอก */}
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            fontSize: 18,
            border: 'none',
            '& .MuiInputBase-input': {
              p: 0,
            },
          }}
          placeholder="เมื่อครู่คุณฝันอะไร"
          inputProps={{ 'aria-label': 'search dreams' }}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { handleSearch(e as any); } }}
        />
        {/* Tag */}
        <Stack direction="row" spacing={1} sx={{ mx: 2 }}>
          <Chip label="ฝันเห็นหมา" size="medium" onClick={() => setKeyword('ฝันเห็นหมา')} />
          <Chip label="ฝันเห็นงู" size="medium" onClick={() => setKeyword('ฝันเห็นงู')} />
          <Chip label="ฝันเห็นพ่อแม่" size="medium" onClick={() => setKeyword('ฝันเห็นพ่อแม่')} />
        </Stack>
        {/* ปุ่มค้นหา */}
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            fontSize: 18,
            px: 4,
            py: 1.5,
            ml: 2,
            boxShadow: 2,
            minWidth: 100,
          }}
          onClick={handleSearch}
        >
          <SearchIcon sx={{ mr: 1 }} />
          ค้นหา
        </Button>
      </Paper>
    </Box>
  );
}