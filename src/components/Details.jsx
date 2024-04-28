import { Box, Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const Details = ({ data }) => {
  const [details_data, setDetailsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const fetchedData = data?.clientResps || []; 
      setDetailsData(fetchedData);
    };

    fetchData(); 
  }, [data]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h3 style={{ textAlign: "left" }}>Details</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {details_data ? (
                  <>
                    <TableRow>
                      <TableCell style={{ color: "#00000099", fontSize: "16px", fontWeight: "400", font: "inter" }}>Platform</TableCell>
                      <TableCell>{details_data.platform}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: "#00000099", fontSize: "16px", fontWeight: "400", font: "inter" }}>Admin Email</TableCell>
                      <TableCell>{details_data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: "#00000099", fontSize: "16px", fontWeight: "400", font: "inter" }}>Install Email</TableCell>
                      <TableCell>{details_data.installer_email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: "#00000099", fontSize: "16px", fontWeight: "400", font: "inter" }}>Status</TableCell>
                      <TableCell>{details_data.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: "#00000099", fontSize: "16px", fontWeight: "400", font: "inter" }}>Data Center URL</TableCell>
                      <TableCell>{details_data.data_center_url}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: "#00000099", fontSize: "16px", fontWeight: "400", font: "inter" }}>Services</TableCell>
                      <TableCell>{details_data.services}</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>Loading...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={8}>
            <Box sx={{height:"80vh",border:"1px solid #e0e0e0", marginLeft:"20px",borderRadius:"5px"}}>
                <div style={{padding:"0px 10px 0px 20px"}}>
            <h3 style={{ textAlign: "left" }}>Send Email</h3>
            <Grid  sx={{paddingLeft:"15px"}} container rowSpacing={1} columnSpacing={1}>
        <Grid  xs={4} >
        <Card sx={{ minWidth: 175,border:"1px solid green",display:"flex",marginRight:"20px",marginBottom:"20px" }}>

        <div style={{padding:"10px 10px 0 ",width:"80%"}}>
        <Typography sx={{ mb: 1.5,textAlign:"left" }} color="text.secondary">
          First Email
        </Typography>
        </div>
        <div style={{padding:"10px 10px 0 ",width:"20%",color:"green"}}>
            <MarkEmailReadIcon/>
        </div>
    
    </Card>
        </Grid>
        <Grid  xs={4}>
        <Card sx={{ minWidth: 175,border:"1px solid green",display:"flex",marginRight:"20px",marginBottom:"20px" }}>

<div style={{padding:"10px 10px 0 ",width:"80%"}}>
<Typography sx={{ mb: 1.5,textAlign:"left" }} color="text.secondary">
  After 15 days email
</Typography>
</div>
<div style={{padding:"10px 10px 0 ",width:"20%",color:"green"}}>
    <MarkEmailReadIcon/>
</div>

</Card>
        </Grid>
        <Grid  xs={4}>
        <Card sx={{ minWidth: 175,border:"1px solid green",display:"flex",marginRight:"20px",marginBottom:"20px"}}>

<div style={{padding:"10px 10px 0 ",width:"80%"}}>
<Typography sx={{ mb: 1.5,textAlign:"left" }} color="text.secondary">
  After 30 days email
</Typography>
</div>
<div style={{padding:"10px 10px 0 ",width:"20%",color:"green"}}>
    <MarkEmailReadIcon/>
</div>

</Card>
        </Grid>
        <Grid  xs={4}>
        <Card sx={{ minWidth: 175,backgroundColor:"#F5F5F5",display:"flex",marginRight:"20px",marginBottom:"20px"}}>

<div style={{padding:"10px 10px 0 ",width:"80%"}}>
<Typography sx={{ mb: 1.5,textAlign:"left" }} color="text.secondary">
  Marketing Email
</Typography>
</div>
<div style={{padding:"5px 10px 0 ",width:"50%",color:"green"}}>
    <Button> Send Email</Button>
</div>

</Card>
        </Grid>
        <Grid  xs={4}>
        <Card sx={{ minWidth: 175,backgroundColor:"#F5F5F5",display:"flex",marginRight:"20px",marginBottom:"20px"}}>

<div style={{padding:"10px 10px 0 ",width:"80%"}}>
<Typography sx={{ mb: 1.5,textAlign:"left" }} color="text.secondary">
  Service Email
</Typography>
</div>
<div style={{padding:"5px 10px 0 ",width:"50%",color:"green"}}>
    <Button> Send Email</Button>
</div>

</Card>
        </Grid>
      </Grid>
            </div>

            </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;
