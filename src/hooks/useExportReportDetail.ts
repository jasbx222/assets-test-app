import Swal from "sweetalert2";
// import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
export const handleExportReportDetail = (filteredItems:any,id:any) => {
    if (filteredItems.length === 0) {
     Swal.fire({
      title:"no thing to export",
      icon:"error"
     })
      return;
    }

    const exportData = filteredItems.map((item:any) => ({
      الوسم: item.label,
      الحالة: item.status,
      'اسم الأصل': item.asset_name,
      'في الغرفة المطلوبة': item.in_requested_room ? 'نعم' : 'لا',
      الشعبة: item.division?.name || '-',
      القسم: item.department?.name || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `تفاصيل تقرير ${id}`);
    XLSX.writeFile(workbook, `report-detail-${id}.xlsx`);
  };