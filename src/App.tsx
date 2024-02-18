import React from "react";
import Papa from "papaparse";
import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type ShipListing = {
  name: string;
  corporationPrice: string;
  alliancePrice: string;
  additionalNotes: string;
};

function App() {
  const [shipListings, setShipSales] = React.useState<ShipListing[]>([]);

  React.useEffect(() => {
    fetch("/rti-shipyard/2024-08-02-ship-listings.csv").then((response) => {
      response.text().then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (result: Papa.ParseResult<ShipListing>) => {
            setShipSales(result.data);
          },
        });
      });
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1">RTI Shipyard</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Corporation Price</TableCell>
                <TableCell align="right">Alliance Price</TableCell>
                <TableCell align="right">Additional Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipListings.map((listing) => (
                <TableRow
                  key={listing.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {listing.name}
                  </TableCell>
                  <TableCell align="right">
                    {listing.corporationPrice}
                  </TableCell>
                  <TableCell align="right">{listing.alliancePrice}</TableCell>
                  <TableCell align="right">{listing.additionalNotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}

export default App;
