import React, { useState } from "react";
import "./style.css";
// export default class index extends Component {
//   state = {
//     allBilling: [],
//     processingBilling: [],
//     doanhthuthangnay: 0,
//     doanhthuthangtruoc: 0,
//   };
//   async componentDidMount() {
//     let allBilling = [];
//     let processingBilling = [];
//     let doanhthuthangnay = 0;
//     let doanhthuthangtruoc = 0;
//     await hoadonAPI
//       .twentyhoadon()
//       .then((success) => {
//         allBilling = success.data.value.$values;
//       })
//       .catch((error) => {});

//     var homnay = new Date();

//     await hoadonAPI
//       .doanhthutheothang(homnay.getMonth() + 1, homnay.getFullYear())
//       .then((success) => {
//         doanhthuthangnay = success.data.value.tongtien;
//       })
//       .catch((error) => {});

//     await hoadonAPI
//       .doanhthutheothang(homnay.getMonth(), homnay.getFullYear())
//       .then((success) => {
//         doanhthuthangtruoc = success.data.value.tongtien;
//       })
//       .catch((error) => {});

//     await hoadonAPI
//       .processingBilling()
//       .then((success) => {
//         processingBilling = success.data.value.$values;
//       })
//       .catch((error) => {});
//     this.setState({
//       allBilling: allBilling,
//       processingBilling: processingBilling,
//       doanhthuthangnay: doanhthuthangnay,
//       doanhthuthangtruoc: doanhthuthangtruoc,
//     });
//   }
//   render() {
//     return (
//       <main className="main-content position-relative border-radius-lg left-menu">
//           <nav
//             className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl  gray-color"
//             id="navbarBlur"
//             navbar-scroll="true"
//           >
//             <div className="container-fluid py-1 px-3  gray-color">
//               <div
//                 className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
//                 id="navbar"
//               >
//                 <div className="ms-md-auto pe-md-3 d-flex align-items-center">
//                   <div className="input-group input-group-outline">
//                     <label className="form-label">Type here...</label>
//                     <input type="text" className="form-control" />
//                   </div>
//                 </div>
//                 <ul className="navbar-nav  justify-content-end">
//                   <li className="nav-item d-flex align-items-center">
//                     <a
//                       className="nav-link text-body font-weight-bold px-0"
//                       href={() => false}
//                     >
//                       <i className="fa fa-user me-sm-1" />
//                       <span className="d-sm-inline d-none">Sign In</span>
//                     </a>
//                   </li>
//                   <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
//                     <a
//                       href={() => false}
//                       className="nav-link text-body p-0"
//                       id="iconNavbarSidenav"
//                     >
//                       <div className="sidenav-toggler-inner">
//                         <i className="sidenav-toggler-line" />
//                         <i className="sidenav-toggler-line" />
//                         <i className="sidenav-toggler-line" />
//                       </div>
//                     </a>
//                   </li>
//                   <li className="nav-item px-3 d-flex align-items-center">
//                     <a href={() => false} className="nav-link text-body p-0">
//                       <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
//                     </a>
//                   </li>
//                   <li className="nav-item dropdown pe-2 d-flex align-items-center">
//                     <a
//                       href={() => false}
//                       className="nav-link text-body p-0"
//                       id="dropdownMenuButton"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <i className="fa fa-bell cursor-pointer" />
//                     </a>
//                     <ul
//                       className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
//                       aria-labelledby="dropdownMenuButton"
//                     >
//                       <li className="mb-2">
//                         <a
//                           className="dropdown-item border-radius-md"
//                           href={() => false}
//                         >
//                           <div className="d-flex py-1">
//                             <div className="my-auto">
//                               <img
//                                 alt=""
//                                 src="./assets/img/team-2.jpg"
//                                 className="avatar avatar-sm  me-3 "
//                               />
//                             </div>
//                             <div className="d-flex flex-column justify-content-center">
//                               <h6 className="text-sm font-weight-normal mb-1">
//                                 <span className="font-weight-bold">
//                                   New message
//                                 </span>{" "}
//                                 from Laur
//                               </h6>
//                               <p className="text-xs text-secondary mb-0">
//                                 <i className="fa fa-clock me-1" />
//                                 13 minutes ago
//                               </p>
//                             </div>
//                           </div>
//                         </a>
//                       </li>
//                       <li className="mb-2">
//                         <a
//                           className="dropdown-item border-radius-md"
//                           href={() => false}
//                         >
//                           <div className="d-flex py-1">
//                             <div className="my-auto">
//                               <img
//                                 alt=""
//                                 src="./assets/img/small-logos/logo-spotify.svg"
//                                 className="avatar avatar-sm bg-gradient-dark  me-3 "
//                               />
//                             </div>
//                             <div className="d-flex flex-column justify-content-center">
//                               <h6 className="text-sm font-weight-normal mb-1">
//                                 <span className="font-weight-bold">
//                                   New album
//                                 </span>{" "}
//                                 by Travis Scott
//                               </h6>
//                               <p className="text-xs text-secondary mb-0">
//                                 <i className="fa fa-clock me-1" />1 day
//                               </p>
//                             </div>
//                           </div>
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           className="dropdown-item border-radius-md"
//                           href={() => false}
//                         >
//                           <div className="d-flex py-1">
//                             <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
//                               <svg
//                                 width="12px"
//                                 height="12px"
//                                 viewBox="0 0 43 36"
//                                 version="1.1"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                               >
//                                 <title>credit-card</title>
//                                 <g
//                                   stroke="none"
//                                   strokeWidth={1}
//                                   fill="none"
//                                   fillRule="evenodd"
//                                 >
//                                   <g
//                                     transform="translate(-2169.000000, -745.000000)"
//                                     fill="#FFFFFF"
//                                     fillRule="nonzero"
//                                   >
//                                     <g transform="translate(1716.000000, 291.000000)">
//                                       <g transform="translate(453.000000, 454.000000)">
//                                         <path
//                                           className="color-background"
//                                           d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
//                                           opacity="0.593633743"
//                                         />
//                                         <path
//                                           className="color-background"
//                                           d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
//                                         />
//                                       </g>
//                                     </g>
//                                   </g>
//                                 </g>
//                               </svg>
//                             </div>
//                             <div className="d-flex flex-column justify-content-center">
//                               <h6 className="text-sm font-weight-normal mb-1">
//                                 Payment successfully completed
//                               </h6>
//                               <p className="text-xs text-secondary mb-0">
//                                 <i className="fa fa-clock me-1" />2 days
//                               </p>
//                             </div>
//                           </div>
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//           {/* End Navbar */}
//           <div className="container-fluid py-4  gray-color">
//             <div className="row">
//               <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
//                 <div className="card">
//                   <div className="card-header p-3 pt-2">
//                     <div
//                       className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute"
//                       style={{ color: "white", textAlign: "center" }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={30}
//                         height={30}
//                         fill="currentColor"
//                         className="bi bi-coin"
//                         viewBox="0 0 16 16"
//                         style={{ marginTop: "15px" }}
//                       >
//                         <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
//                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                         <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
//                       </svg>
//                     </div>
//                     <div className="text-end pt-1">
//                       <p className="text-sm mb-0 text-capitalize">
//                         Thu tháng này
//                       </p>
//                       <h4 className="mb-0">{this.state.doanhthuthangnay}</h4>
//                     </div>
//                   </div>
//                   <hr className="dark horizontal my-0" />
//                   <div className="card-footer p-3">
//                     <p className="mb-0">
//                       <span className="text-success text-sm font-weight-bolder">
//                         {(() => {
//                           let result = null;
//                           let suthaydoi =
//                             this.state.doanhthuthangnay -
//                             this.state.doanhthuthangtruoc;
//                           if (suthaydoi > 0) result = <div>+{suthaydoi}</div>;
//                           else result = <div>-{suthaydoi}</div>;
//                           return result;
//                         })()}
//                       </span>
//                       trong tháng
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
//                 <div className="card">
//                   <div className="card-header p-3 pt-2">
//                     <div
//                       className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute"
//                       style={{ color: "white", textAlign: "center" }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={30}
//                         height={30}
//                         fill="currentColor"
//                         className="bi bi-person"
//                         viewBox="0 0 16 16"
//                         style={{ marginTop: "15px" }}
//                       >
//                         <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
//                       </svg>
//                     </div>
//                     <div className="text-end pt-1">
//                       <p className="text-sm mb-0 text-capitalize">Lượt xem</p>
//                       <h4 className="mb-0">2,300</h4>
//                     </div>
//                   </div>
//                   <hr className="dark horizontal my-0" />
//                   <div className="card-footer p-3">
//                     <p className="mb-0">
//                       <span className="text-success text-sm font-weight-bolder">
//                         +3%{" "}
//                       </span>{" "}
//                       trong tuần
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
//                 <div className="card">
//                   <div className="card-header p-3 pt-2">
//                     <div
//                       className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute"
//                       style={{ color: "white", textAlign: "center" }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={30}
//                         height={30}
//                         fill="currentColor"
//                         className="bi bi-person"
//                         viewBox="0 0 16 16"
//                         style={{ marginTop: "15px" }}
//                       >
//                         <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
//                       </svg>
//                     </div>
//                     <div className="text-end pt-1">
//                       <p className="text-sm mb-0 text-capitalize">Khách mới</p>
//                       <h4 className="mb-0">3,462</h4>
//                     </div>
//                   </div>
//                   <hr className="dark horizontal my-0" />
//                   <div className="card-footer p-3">
//                     <p className="mb-0">
//                       <span className="text-danger text-sm font-weight-bolder">
//                         -2%
//                       </span>{" "}
//                       trong tuần
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-xl-3 col-sm-6">
//                 <div className="card">
//                   <div className="card-header p-3 pt-2">
//                     <div
//                       className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute"
//                       style={{ color: "white", textAlign: "center" }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={30}
//                         height={30}
//                         fill="currentColor"
//                         className="bi bi-bag-plus"
//                         viewBox="0 0 16 16"
//                         style={{ marginTop: "15px" }}
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
//                         />
//                         <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
//                       </svg>
//                     </div>
//                     <div className="text-end pt-1">
//                       <p className="text-sm mb-0 text-capitalize">
//                         Sản phẩm bán
//                       </p>
//                       <h4 className="mb-0">$103,430</h4>
//                     </div>
//                   </div>
//                   <hr className="dark horizontal my-0" />
//                   <div className="card-footer p-3">
//                     <p className="mb-0">
//                       <span className="text-success text-sm font-weight-bolder">
//                         +5%{" "}
//                       </span>
//                       trong tuần
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="row mb-4">
//               <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
//                 <div className="card">
//                   <div className="card-header pb-0">
//                     <div className="row">
//                       <div className="col-lg-6 col-7">
//                         <h6>Hoá đơn giao dịch</h6>
//                         <p className="text-sm mb-0">
//                           <i
//                             className="fa fa-check text-info"
//                             aria-hidden="true"
//                           />
//                           <span className="font-weight-bold ms-1">30 done</span>{" "}
//                           trong tháng
//                         </p>
//                       </div>
//                       <div className="col-lg-6 col-5 my-auto text-end">
//                         <div className="dropdown float-lg-end pe-4">
//                           <a
//                             href={() => false}
//                             className="cursor-pointer"
//                             id="dropdownTable"
//                             data-bs-toggle="dropdown"
//                             aria-expanded="false"
//                           >
//                             <i className="fa fa-ellipsis-v text-secondary" />
//                           </a>
//                           <ul
//                             className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
//                             aria-labelledby="dropdownTable"
//                           >
//                             <li>
//                               <a
//                                 href={() => false}
//                                 className="dropdown-item border-radius-md"
//                               >
//                                 Action
//                               </a>
//                             </li>
//                             <li>
//                               <a
//                                 href={() => false}
//                                 className="dropdown-item border-radius-md"
//                               >
//                                 Another action
//                               </a>
//                             </li>
//                             <li>
//                               <a
//                                 href={() => false}
//                                 className="dropdown-item border-radius-md"
//                               >
//                                 Something else here
//                               </a>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body px-0 pb-2">
//                     <div className="table-responsive">
//                       <table className="table align-items-center mb-0">
//                         <thead>
//                           <tr>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                               Tên sản phẩm
//                             </th>
//                             <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
//                               Số điện thoại
//                             </th>
//                             <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                               Tên khách hàng
//                             </th>
//                             <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                               Tình trạng
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {function () {
//                             let result = null;
//                             result = this.state.allBilling.map((value, key) => {
//                               return (
//                                 <BillItem key={key} bill={value}></BillItem>
//                               );
//                             });
//                             return result;
//                           }.bind(this)()}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6">
//                 <div className="card h-100">
//                   <div className="card-header pb-0">
//                     <h6>Tiếp nhận đơn hàng</h6>
//                     <p className="text-sm">
//                       <i
//                         className="fa fa-arrow-up text-success"
//                         aria-hidden="true"
//                       />
//                       <span className="font-weight-bold">24%</span> tháng này
//                     </p>
//                   </div>
//                   <div className="card-body p-3">
//                     <div className="timeline timeline-one-side">
//                       {function () {
//                         let result = null;
//                         result = this.state.processingBilling.map(
//                           (value, key) => {
//                             return (
//                               <ProcessingBill
//                                 bill={value}
//                                 key={key}
//                               ></ProcessingBill>
//                             );
//                           }
//                         );
//                         return result;
//                       }.bind(this)()}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//     );
//   }
// }

export default function Index() {
  const [email, setEmail] = useState("");
  return (
    <div>
      <div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Example textarea
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            defaultValue={""}
          />
        </div>
      </div>
    </div>
  );
}
