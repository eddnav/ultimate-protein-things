import { Column, RowData } from "@tanstack/react-table"
import React, { useEffect, useState } from "react"
import { ProductType } from "./models/ProductType"

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
                    placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] !== undefined
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
                    placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
                        ? `(${column.getFacetedMinMaxValues()?.[1]})`
                        : ''
                        }`}
                />
            </div>
        </div>
    ) : filterVariant === 'select' ? (
        <div className="select is-fullwidth">
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

export default Filter