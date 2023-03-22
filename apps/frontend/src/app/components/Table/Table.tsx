import StyledTable from "./Table.style"

interface TableProps {
  columns: string[]
  children: React.ReactNode
}

export const Table = ({ columns, children }: TableProps) => {
  return (
    <StyledTable>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </StyledTable>
  )
}
