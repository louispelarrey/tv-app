import styled from "styled-components";

const StyledShowDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-basis: 0;
  margin-top: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  .season-table {
    width: 85%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .season-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .season-table th,
  .season-table td {
    padding: 12px 15px;
  }

  .season-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .season-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .season-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .season-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  #show-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #009879;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }

  p {
    width: 80%;
    text-align: center;
  }

  @media screen and (min-width: 765px) {
    p {
      width: 60%;
    }
  }
`

export { StyledShowDetails }
