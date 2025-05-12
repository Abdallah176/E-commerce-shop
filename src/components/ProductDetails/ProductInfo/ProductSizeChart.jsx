export default function ProductSizeChart() {
    return (
      <div className="overflow-x-auto mt-6">
        <p className="font-medium mb-2">Size Chart</p>
        <table className="min-w-[300px] text-sm border text-left border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2">Size</th>
              <th className="p-2">Chest (cm)</th>
              <th className="p-2">Waist (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">S</td>
              <td className="p-2">86–91</td>
              <td className="p-2">71–76</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">M</td>
              <td className="p-2">91–97</td>
              <td className="p-2">76–81</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">L</td>
              <td className="p-2">97–102</td>
              <td className="p-2">81–86</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">XL</td>
              <td className="p-2">102–107</td>
              <td className="p-2">86–91</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  