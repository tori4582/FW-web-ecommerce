using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using System.Data;
using GemBox.Spreadsheet;
using System.IO;
using OfficeOpenXml;
using Back.Models;
using System.Drawing;
using OfficeOpenXml.Style;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back.Controllers
{
    public class ExcelController : Controller
    {
        lavenderContext lavenderContext;
        public ExcelController(lavenderContext lavenderContext)
        {
            this.lavenderContext= lavenderContext;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        [Route("/xuatfile")]
        public async Task<IActionResult> XuatFile()
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            var data = new DataTable();
            var stream = new MemoryStream();
            using (var package = new ExcelPackage(stream))
            {
                var sheet = package.Workbook.Worksheets.Add($"id");
                sheet.Cells["A1:H99"].Style.Font.Name = "Times New Roman";
                sheet.Cells["A1:C1"].Merge = true;
                sheet.Column(3).Width = 25;
                sheet.Column(1).Width = 5.33;
                sheet.Column(2).Width = 11.67;
                sheet.Column(5).Width = 20;
                sheet.Cells["A1:C1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                sheet.Cells["A1:C1"].Value = "TRƯỜNG ĐH CÔNG NGHỆ THÔNG TIN";
                sheet.Cells["A2:C2"].Merge = true;
                sheet.Cells["A2:C2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                sheet.Cells["A2:C2"].Style.Font.Bold = true;
                sheet.Cells["A2:C2"].Value = "PHÒNG CÔNG TÁC SINH VIÊN";
                sheet.Cells["A4:D4"].Merge = true;
                sheet.Cells["A4:D4"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                sheet.Cells["A4:D4"].Style.Font.Bold = true;
                sheet.Cells["A4:D4"].Style.Font.Size = 16;
                sheet.Cells["A4:D4"].Value = "DANH SÁCH LỚP CVHT";
                sheet.Cells["A5:C5"].Merge = true;
                sheet.Cells["A5:C5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                sheet.Cells["A5:C5"].Style.Font.Bold = true;
                sheet.Cells["A5:C5"].Value = "Khóa:";
                sheet.Cells["D5:E5"].Merge = true;
                sheet.Cells["D5:E5"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                sheet.Cells["D5:E5"].Style.Font.Bold = true;
                sheet.Cells["D5:E5"].Value = "";
                sheet.Cells["A6:C6"].Merge = true;
                sheet.Cells["A6:C6"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                sheet.Cells["A6:C6"].Style.Font.Bold = true;
                sheet.Cells["A6:C6"].Value = "Khoa:";
                sheet.Cells["D6:E6"].Merge = true;
                sheet.Cells["D6:E6"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                sheet.Cells["D6:E6"].Style.Font.Bold = true;
                sheet.Cells["D6:E6"].Value = "Lớp CVHT:";
                sheet.Cells["A7:C7"].Merge = true;
                sheet.Cells["A7:C7"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                sheet.Cells["A7:C7"].Style.Font.Bold = true;
                sheet.Cells["A7:C7"].Value = "Giảng viên CVHT:";
                sheet.Cells["D7:E7"].Merge = true;
                sheet.Cells["D7:E7"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                sheet.Cells["D7:E7"].Style.Font.Bold = true;
                sheet.Cells["D7:E7"].Value = "Mã giảng viên CVHT:";



                sheet.Row(9).Height = 41.13;
                sheet.Cells["A9:D9"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                sheet.Cells["A9:D9"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                sheet.Cells["A9:D9"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                sheet.Cells["A9:D9"].Style.Fill.BackgroundColor.SetColor(0, 186, 248, 255);
                sheet.Cells["A9:D9"].Style.Font.Bold = true;
                sheet.Cells["A9:D9"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                sheet.Cells["A9:D9"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                sheet.Cells["A9:D9"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                sheet.Cells["A9:D9"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                sheet.Cells["A9:A9"].Value = "STT";
                sheet.Cells["B9:B9"].Value = "Mã số SV";
                sheet.Cells["C9:C9"].Value = "Họ và tên sinh viên";
                sheet.Cells["D9:D9"].Value = "Ghi chú";

                var query = await (from t in lavenderContext.Sanpham
                                   select t).ToListAsync();




                var count = query.Count();
                if (count < 1)
                {
                    return Content("Không có sinh viên trong danh sách");
                }



                int i = 1;
                int j = 10;
                count = count + 10 - 1;
                string chuoi = $"A10:D{count}";
                var query2 = query.ToList();



                var malop_temp = query2[0].Masanpham;
                if (count >= 10)
                {
                    sheet.Cells[chuoi].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    sheet.Cells[chuoi].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    sheet.Cells[chuoi].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    sheet.Cells[chuoi].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    sheet.Cells[chuoi].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    sheet.Cells[chuoi].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    foreach (var item in query)
                    {
                        sheet.Row(j).Height = 30;
                        string stt = $"A{j}:A{j}";
                        string masv = $"B{j}:B{j}";
                        string tensv = $"C{j}:C{j}";
                        sheet.Cells[stt].Value = i;
                        sheet.Cells["A5:C5"].Value = $"Khóa: {item.Tensanpham}";
                        sheet.Cells["D5:E5"].Value = $"";
                        sheet.Cells["A6:C6"].Value = $"Khoa: {item.Maloai}";
                        sheet.Cells["D6:E6"].Value = $"Lớp: {item.Mathuonghieu}";
                        sheet.Cells["A7:C7"].Value = $"Giảng viên CVHT: {item.Masanpham}";
                        sheet.Cells["D7:E7"].Value = $"Mã giảng viên CVHT: {item.Masanpham}";
                        sheet.Cells[masv].Value = item.Masanpham;
                        sheet.Cells[tensv].Value = item.Masanpham;
                        i++;
                        j++;
                    }
                    sheet.Name = "Bao cao thong ke";

                    package.Save();
                }

                stream.Position = 0;
                var tenfile = "Bao cao thong ke";
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", tenfile);

            }
        }


    }
}