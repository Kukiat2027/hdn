import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const cases = [
  {
    title: 'เฮงรวยรวยธนิดา อิ่มทรัพย์',
    desc: 'เฮงๆรวยๆ',
    author: 'ธนิดา',
    date: 'เผยแพร่เมื่อ 1 ปีที่แล้ว',
    img: '/case1.png',
    likes: 114,
    comments: 6,
  },
  {
    title: 'ขอให้บ้านอยู่และขอให้ที่ทำกิน จะได้อยู่กับครอบครัวพร้อมหน้าพร้อมตากันด้วยเถอะสาธุ',
    desc: 'ผมอยากให้บ้านและที่ทำกินคืนมาให้พ่อแม่และลูกหลานได้อยู่กันอย่างพอเพียงไม่ต้องใช้ชีวิตแบบ...',
    author: 'วิรศักดิ์',
    date: 'เผยแพร่เมื่อ 2 ปีที่แล้ว',
    img: '/case2.png',
    likes: 203,
    comments: 11,
  },
  {
    title: 'หมดหนี้หมดสิน ขอให้ลูกถูกหวยรางวัลใหญ่ๆ ทุกงวดด้วยเถิด...สาธุ',
    desc: 'อยากให้ชีวิตครอบครัวสบาย ไม่ต้องเห็นเจ็บเห็นตายเพราะลูกหลานเลี้ยงยาก...',
    author: 'ศรัญญาภรณ์',
    date: 'เผยแพร่เมื่อ 2 ปีที่แล้ว',
    img: '/case3.png',
    likes: 421,
    comments: 18,
  },
];

export default function SuccessCases() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          fontWeight="bold"
          align="center"
          sx={{ color: '#a100e6', mb: 4, fontSize: { xs: 28, md: 40 } }}
        >
          เคสที่สำเร็จกับเรา
        </Typography>
        <Button endIcon={<span>→</span>} sx={{ color: '#8f2fff', fontSize: 16 }}>
          ดูทั้งหมด
        </Button>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {cases.map((item, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                image={item.img}
                alt={item.title}
                sx={{ height: 290, width: '100%', objectFit: 'cover' }}
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5, fontSize: 20 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: 18 }}>
                    {item.desc}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: 14 }}>
                    โดย {item.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontSize: 14 }}>
                    {item.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span role="img" aria-label="like">💙</span>
                      <Typography variant="caption">{item.likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span role="img" aria-label="comment">💬</span>
                      <Typography variant="caption">{item.comments}</Typography>
                    </Box>
                  </Box>
                  <Button size="small" variant="outlined" endIcon={<span>→</span>} sx={{ borderRadius: 2 }}>
                    ดูรายละเอียด
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}