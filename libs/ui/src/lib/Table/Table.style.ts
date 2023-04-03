import styled from "styled-components";

const StyledTable = styled.div`
  .table {
      width: 85%;
      border-collapse: collapse;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

  .table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .table th,
  .table td {
    padding: 12px 15px;
  }

  .table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
`;

export default StyledTable;
