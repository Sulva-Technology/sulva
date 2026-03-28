import { ReactNode } from 'react';

interface Column {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
    data: any[];
    columns: Column[];
    emptyMessage?: string;
}

export function DataTable({ data, columns, emptyMessage = 'No data available' }: DataTableProps) {
    if (!data || data.length === 0) {
        return (
            <div className="w-full p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-lg">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                                {columns.map((col, colIndex) => {
                                    const value = row[col.accessor];
                                    return (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900"
                                        >
                                            {col.render ? col.render(value, row) : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
