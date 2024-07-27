import React, { useEffect, useState } from 'react';
import './App.css';
import { Review } from './models/Review';
import { Column, ColumnFiltersState, createColumnHelper, flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, RowData, useReactTable } from '@tanstack/react-table';
import { ProductType } from './models/ProductType';
import 'bulma/css/bulma.min.css';
import { Tier } from './models/Tier';

// TODO: Add expanding to show pros, cons extra info
// TODO: Fix formatting eslint + prettier
// TODO: Fix favico and logos
// TODO: Fix this code, split it
// TODO: Paginate

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

function toKeyAndUserFacingStringTuple(key: any): [any, any] {
  if (Object.keys(ProductType).includes(key)) {
    return [key, ProductType.toString(key)]
  } else {
    return [key, key]
  }
}

function Filter({ column }: { column: Column<any, unknown> }) {

  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue()

  const uniqueValues = React.useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .map(toKeyAndUserFacingStringTuple)
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  )

  return filterVariant === 'range' ? (
    <div className='columns is-1'>
      <div className='column'>
        <DebouncedInput
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
        />
      </div>
      <div className='column'>
        <DebouncedInput
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
        />
      </div>
    </div>
  ) : filterVariant === 'select' ? (
    <div className="select">
    <select
      onChange={e => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {uniqueValues.map(value => (
        <option value={value[0]} key={value[0]}>
          {value[1]}
        </option>
      ))}
    </select>
    </div>
  ) : (
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
      />
  )
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input className="input" {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

function App() {
  
  const [data, setData] = useState<Review[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const helper = createColumnHelper<Review>()
  const columns = [
        helper.accessor('product.imageUrl', {
          header: () => <span></span>,
          cell: ({row}) => <figure className="image is-96x96">
          <img src={row.original.product.imageUrl} />
        </figure>,
    enableColumnFilter: false
        }),
        helper.accessor('product.brand', {
          header: () => <span>Brand</span>,
          cell: info => info.getValue(),
          meta: {
            filterVariant: 'select',
          }
        }),
        helper.accessor('product.name', {
          header: () => <span>Product</span>,
          cell: info => info.getValue(),
          meta: {
            filterVariant: 'text',
          }
        }),
        helper.accessor('product.type', {
          header: () => <span>Type</span>,
          cell: ({row}) => <span>{ProductType.toString(row.original.product.type)}</span>,
          filterFn: 'equalsString',
          meta: {
            filterVariant: 'select',
          }
        }),
        helper.accessor('product.caloriesInKcal', {
          header: () => <span>Calories (kcal)</span>,  
          cell: ({row}) => <span>{`${row.original.product.caloriesInKcal} kcal`}</span>,
          meta: {
            filterVariant: 'range',
          }
        }),
        helper.accessor('product.proteinInGrams', {
          header: () => <span>Protein (g)</span>,  
          cell: ({row}) => <span>{`${row.original.product.proteinInGrams} g`}</span>,
          meta: {
            filterVariant: 'range',
          }
        }),
        helper.accessor('tier', {
          header: () => <span>Tier</span>,
          cell: ({row}) => <span className={`tag is-large ${Tier.getTagClassName(row.original.tier)}`}>{row.original.tier}</span>,
          filterFn: 'equalsString',
          meta: {
            filterVariant: "select"
          }
        })
    ]

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  })

  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('https://raw.githubusercontent.com/eddnav/ultimate-protein-things/main/data.json');
          const result: [Review] = await response.json();
          setData(result);
      };
      fetchData();
  }, []);

  return (
    <section className="section">
      <div className='container mb-6'>
      <div className='content is-medium'>
      <h1>Protein Things, Reviewed</h1>
      <p>Judgement passed upon unsuspecting protein products by a <a href='https://github.com/eddnav'>developer</a> with a bit too much time on his hands.</p>
      </div>
      </div>
      <div className='container'>
      <table className="table is-fullwidth is-hoverable is-striped">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  <div className='mb-2'>
                  <div className='mb-1'>
                  {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </div>
                    {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                      </div>
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
