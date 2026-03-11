'use client';

function Table({ children, className = '' }) {
  return <table className={`w-full ${className}`}>{children}</table>;
}

function TableHead({ children, className = '' }) {
  return <thead className={`bg-[#F5F5FA] ${className}`}>{children}</thead>;
}

function TableBody({ children, className = '' }) {
  return <tbody className={`divide-y divide-[#ABAFB1] ${className}`}>{children}</tbody>;
}

function TableRow({ children, className = '', onClick }) {
  return (
    <tr className={`hover:bg-[#F5F5FA] ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
}

function TableTh({ children, className = '' }) {
  return (
    <th className={`px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366] ${className}`}>
      {children}
    </th>
  );
}

function TableTd({ children, className = '', bold = false }) {
  return (
    <td className={`px-4 py-3 text-[12px] ${bold ? 'font-semibold text-[#050505]' : 'text-[#5E6366]'} ${className}`}>
      {children}
    </td>
  );
}

function TableEmpty({ children = 'No data found', colSpan = 5 }) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center text-[#5E6366] py-8 text-[14px]">
        {children}
      </td>
    </tr>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Th = TableTh;
Table.Td = TableTd;
Table.Empty = TableEmpty;

export default Table;
