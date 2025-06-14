 import * as XLSX from 'xlsx';
 export const handleExport = (filteredReports:any) => {
    const flatData = filteredReports.flatMap(
      (report:any) =>
        report.result?.items_details?.map((item: any) => ({
          'رقم التقرير': report.id,
          'اسم المستخدم': report.client_id?.name || '-',
          'اسم الغرفة': report.room_id?.name || '-',
          الحالة: item.status,
          الوسم: item.label,
          الاسم: item.asset_name,
          'في الغرفة المطلوبة': item.in_requested_room ? 'نعم' : 'لا',
        })) || [],
    );

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'تفاصيل التقارير');
    XLSX.writeFile(workbook, 'reports.xlsx');
  };