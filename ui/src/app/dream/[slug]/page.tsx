import DreamResultMain from '@/components/DreamResultMain';
import DreamResultSidebar from '@/components/DreamResultSidebar';
import { Box, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Footer from '@/components/Footer';

export default async function DreamResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const keyword = decodeURIComponent(resolvedParams?.slug || '');
  return (
    <>
      {/* Header Image Full Screen */}
      <Box>
        <CardMedia
          component="img"
          image="/header.png"
          alt="header dream"
          sx={{ width: '100%', height: 100 }}
        />
      </Box>
      <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <DreamResultMain keyword={keyword} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DreamResultSidebar />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}