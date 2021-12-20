import ThongTinTaiKhoan from "./ThongTinTaiKhoan";
import ThongBaoCuaToi from "./ThongBaoCuaToi";
import QuanLyDonHang from "./QuanLyDonHang";
import SanPhamYeuThich from "./SanPhamYeuThich";
import ThayDoiSDT from "./ThongTinTaiKhoan/ThayDoiSDT";
import ThayDoiEmail from "./ThongTinTaiKhoan/ThayDoiEmail";

const routes=[
    {
        path: "/lmember/thongtintaikhoan",
        exact: true,
        main: () => <ThongTinTaiKhoan></ThongTinTaiKhoan>
      },
      {
        path: "/lmember/thongtintaikhoan/sdt",
        exact: true,
        main: () => <ThayDoiSDT></ThayDoiSDT>
      },
      {
        path: "/lmember/thongtintaikhoan/email",
        exact: true,
        main: () => <ThayDoiEmail></ThayDoiEmail>
      },
      {
        path: "/lmember/quanlydonhang",
        exact: true,
        main: () => <QuanLyDonHang></QuanLyDonHang>
      },
      {
        path: "/lmember/thongbaocuatoi",
        exact: true,
        main: () => <ThongBaoCuaToi></ThongBaoCuaToi>
      },
      {
        path: "/lmember/sanphamyeuthich",
        exact: true,
        main: () => <SanPhamYeuThich></SanPhamYeuThich>
      },
      
]
export default routes;