"use client";

import React from "react";
import { Pencil, Eye, Trash } from "lucide-react";
import Scrollbar from "react-scrollbars-custom"; // Ensure this is installed
// npm i react-scrollbars-custom

interface ColumnConfig {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface ActionHandlers<T> {
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
  customAction?: (item: T, index: number) => React.ReactNode;
}

interface TableProps<T> extends ActionHandlers<T> {
  columns: ColumnConfig[];
  data: T[];
  showSerialNo?: boolean;
  tableClassName?: string;
  noDataText?: string;
  style?: React.CSSProperties;
  filterHeight?: number;
}

export const ReusableTable = <T extends { id?: string | number }>({
  columns,
  data,
  showSerialNo = true,
  tableClassName = "",
  noDataText = "No Data Found",
  onEdit,
  onView,
  onDelete,
  customAction,
  style,
  filterHeight = 100,
}: TableProps<T>) => {
  const hasActions = onEdit || onView || onDelete || customAction;

  const TableHeader = () => (
    <thead className="bg-primaryLight text-black">
      <tr>
        {showSerialNo && (
          <th className="px-4 py-2 text-left rounded-tl-md">Sr. No.</th>
        )}
        {columns.map((col, index) => (
          <th
            key={col.key}
            align={col.align || "left"}
            className={`px-4 py-2 text-${col.align || "left"} ${
              index === columns.length - 1 && !hasActions ? "rounded-tr-md" : ""
            }`}
          >
            {col.label}
          </th>
        ))}
        {hasActions && (
          <th className="px-4 py-2 text-center rounded-tr-md">Actions</th>
        )}
      </tr>
    </thead>
  );

  const TableBody = () => (
    <tbody>
      {data.length > 0 ? (
        data.map((item, index) => {
          const isLastRow = index === data.length - 1;

          return (
            <tr
              key={item.id || index}
              className="hover:bg-gray-100 transition-colors"
            >
              {showSerialNo && (
                <td
                  className={`px-4 py-2 text-center ${
                    isLastRow ? "rounded-bl-md" : ""
                  }`}
                >
                  {index + 1}
                </td>
              )}
              {columns.map((col, colIndex) => {
                const isLastColumn =
                  colIndex === columns.length - 1 && !hasActions;

                return (
                  <td
                    key={col.key}
                    align={col.align || "left"}
                    className={`px-4 py-2 text-${col.align || "left"} ${
                      isLastRow && isLastColumn ? "rounded-br-md" : ""
                    }`}
                  >
                    {String(item[col.key as keyof T] ?? "")}
                  </td>
                );
              })}
              {hasActions && (
                <td
                  className={`px-4 py-2 text-center ${
                    isLastRow ? "rounded-br-md" : ""
                  }`}
                >
                  <div className="flex gap-2 justify-center items-center">
                    {onView && (
                      <button onClick={() => onView(item)} title="View">
                        <Eye size={18} />
                      </button>
                    )}
                    {onEdit && (
                      <button onClick={() => onEdit(item)} title="Edit">
                        <Pencil size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(item)} title="Delete">
                        <Trash size={18} className="text-red-500" />
                      </button>
                    )}
                    {customAction && customAction(item, index)}
                  </div>
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={columns.length + (showSerialNo ? 1 : 0) + (hasActions ? 1 : 0)}
            align="center"
            className="px-4 py-6 text-gray-500"
          >
            {noDataText}
          </td>
        </tr>
      )}
    </tbody>
  );

  const TableComponent = () => (
    <table
      className={`min-w-full border border-gray-300 border-separate border-spacing-0 rounded-md overflow-hidden ${tableClassName}`}
    >
      {TableHeader()}
      {TableBody()}
    </table>
  );

  const viewTableLayout = () => {
    if (!style) {
      return (
        <div className="table-component whitespace-nowrap">{TableComponent()}</div>
      );
    }

    const height = `calc(100vh - ${Number(style.height) + filterHeight}px)`;

    return (
      <div className="table-component">
        <Scrollbar style={{ ...style, height }}>{TableComponent()}</Scrollbar>
      </div>
    );
  };

  return viewTableLayout();
};
