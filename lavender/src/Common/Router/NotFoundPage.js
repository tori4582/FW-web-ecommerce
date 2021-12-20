import "./NotFoundPage.scss";
import { Link } from "react-router-dom";
import logo from "./logo.png";

export default function NotFoundPage() {
  return (
    <div> 
      <section className="wrapper">
        <div className="container">
        <img alt="logo" className="notfoundlogo" style={{marginBottom:"400px"}} src={logo}/>
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2" />
            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece" />
                <span className="piece" />
                <span className="piece" />
              </div>
            </div>
            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece" />
                <span className="piece" />
                <span className="piece" />
              </div>
            </div>
            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece" />
                <span className="piece" />
                <span className="piece" />
              </div>
            </div>
            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>
          <div className="text">
            <article>
              <p>
                Ooops... <br />
                Trang không tìm thấy!
              </p>
              <Link to="/">TRANG CHỦ</Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
