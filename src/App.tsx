import { useEffect, useState } from 'react';
import './App.css';
import { Review } from './models/Review';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ProductType } from './models/ProductType';
import 'bulma/css/bulma.min.css';

function App() {
  
  const [data, setData] = useState<Review[]>([]);

  const helper = createColumnHelper<Review>()
  const columns = [
        helper.accessor('product.brand', {
          header: () => <span>Product</span>,
          cell: info => info.getValue()
        }),
        helper.accessor('product.name', {
          header: () => <span>Brand</span>,
          cell: info => info.getValue()
        }),
        helper.accessor('product.type', {
          header: () => <span>Type</span>,
          cell: ({row}) => <span>{ProductType.toString(row.original.product.type)}</span>
        }),
        helper.accessor('tier', {
          header: () => <span>Tier</span>,
          cell: info => info.getValue()
        })
    ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('https://raw.githubusercontent.com/eddnav/ultimate-protein-things/main/data.json');
          const result: [Review] = await response.json();
          setData([...result, ...result, ...result, ...result, ...result]);
      };
      fetchData();
  }, []);

  return (
    <section className="section">
      <div className='container'>
      <table className="table is-fullwidth is-bordered is-hoverable is-striped">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}

export default App;
