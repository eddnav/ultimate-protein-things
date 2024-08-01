import { useEffect, useState } from "react";
import "./App.css";
import { Review } from "./models/Review";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Filter from "./Filter";
import { ReviewCard } from "./ReviewCard";

function App() {
  const [data, setData] = useState<Review[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const helper = createColumnHelper<Review>();

  const columns = [
    helper.accessor("product.imageUrl", {
      header: () => <></>,
      enableColumnFilter: false,
    }),
    helper.accessor("product.brand", {
      header: () => <span>Brand</span>,
      meta: {
        filterVariant: "select",
      },
    }),
    helper.accessor("product.name", {
      header: () => <span>Product</span>,
      meta: {
        filterVariant: "text",
      },
    }),
    helper.accessor("product.type", {
      header: () => <span>Type</span>,
      filterFn: "equalsString",
      meta: {
        filterVariant: "select",
      },
    }),
    helper.accessor("product.caloriesInKcal", {
      header: () => <span>Calories (kcal)</span>,
      meta: {
        filterVariant: "range",
      },
    }),
    helper.accessor("product.proteinInGrams", {
      header: () => <span>Protein (g)</span>,
      meta: {
        filterVariant: "range",
      },
    }),
    helper.accessor("tier", {
      header: () => <span className="text-ellipsis">Tier</span>,
      filterFn: "equalsString",
      meta: {
        filterVariant: "select",
      },
    }),
  ];

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
    debugColumns: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/eddnav/ultimate-protein-things/main/data.json"
      );
      const result: [Review] = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <section className="section">
      <div className="container mb-6">
        <div className="content is-medium">
          <h1>Protein Things, Reviewed</h1>
          <p>
            Judgement passed upon unsuspecting protein products by{" "}
            <a href="https://github.com/eddnav">this guy</a>.
          </p>
        </div>
        <div className="columns is-centered">
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) =>
              header.column.getCanFilter() ? (
                <div className="column is-desktop" key={header.id}>
                  <div className="mb-2">
                    <div className="mb-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                    <div>
                      <Filter column={header.column} />
                    </div>
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      <div className="container is-fluid">
        <div className="masonry-columns">
          {table.getRowModel().rows.map((row) => (
            <div className="masonry-item" key={row.id}>
              <ReviewCard row={row} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
