import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const New = () => {
  const rows = [
    {
      id: 78529637415,
      Consumerid: "875484510",
      load: "5 KW",
      Adress: "Islamabad, F10/Muhammad",
      amount: 2000,
      method: "Online/Cash",
      status: "EDIT",
    },
    {
      id: 54621309878,
      Consumerid: "875484510",
      load: "5 KW",
      date: "9AM - 5PM",
      amount: 3500,
      method: "Online/Cash",
      status: "EDIT",
    },
    {
      id: 789456123025,
      Consumerid: "875484510",
      load: "5 KW",
      customer: "Gaenacologist",
      amount: 4000,
      method: "Online/Cash",
      status: "EDIT",
    },
    {
      id: 254124125412,
      Consumerid: "875484510",
      load: "5 KW",
      date: "9AM - 5PM",
      amount: 5000,
      method: "yes",
      status: "EDIT",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Reference No</TableCell>
            <TableCell className="tableCell">Consumer ID</TableCell>
            <TableCell className="tableCell">Total Load</TableCell>
            <TableCell className="tableCell">Adress/Area/Name</TableCell>
            <TableCell className="tableCell">Bill Status</TableCell>
            <TableCell className="tableCell">Net Metering</TableCell>
            <TableCell className="tableCell"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow >
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell"></TableCell>
              <TableCell className="tableCell">{row.discount}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default New;