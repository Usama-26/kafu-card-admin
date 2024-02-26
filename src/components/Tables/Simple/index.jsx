export default function SimpleTable({ headers, children }) {
  return (
    <div className=" flow-root">
      <div className="-mx-2 sm:-mx-4 lg:-mx-6 table-height min-h-96 table-scrollbar overflow-auto border rounded-md">
        <table className="min-w-full divide-gray-300">
          <thead className="sticky top-0 shadow-sm shadow-gray-300 font-medium bg-primary text-white">
            <tr className="py-2">
              <th
                scope="col"
                className="whitespace-nowrap py-3.5 px-3 text-left "
              >
                #
              </th>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
