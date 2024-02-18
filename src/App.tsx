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
  id: string;
  name: string;
  internalPrice: number;
  externalPrice: number;
  blueprint: boolean;
};

function App() {
  const [shipListings, setShipSales] = React.useState<ShipListing[]>([]);

  React.useEffect(() => {
    fetch("/ships.csv")
      .then((response) => {
        response.text().then((text) => {
          Papa.parse(text, {
            header: true,
            complete: (result: Papa.ParseResult<ShipListing>) => {
              console.log(result.data);
              setShipSales(result.data);
            },
          });
        });
      })
      .catch((error) => {
        console.log(error);
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
                <TableCell align="right">Internal Price</TableCell>
                <TableCell align="right">External Price</TableCell>
                <TableCell align="right">Need Blueprint?</TableCell>
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
                  <TableCell align="right">{listing.internalPrice}</TableCell>
                  <TableCell align="right">{listing.externalPrice}</TableCell>
                  <TableCell align="right">{listing.blueprint}</TableCell>
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
