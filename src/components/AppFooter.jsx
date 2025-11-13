import './AppFooter.css';
import facebook from "/img/facebook.webp";
import instagram from "/img/Instagram.png";
const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="footer-info">
        <p>มหาวิทยาลัยศรีปทุม | คณะเทคโนโลยีสารสนเทศ | สาขาวิทยาการคอมพิวเตอร์</p>
      </div>

      <div className="footer-social">
       <a href="https://www.instagram.com/kasidxch_/"  target="_blank"><img src={instagram} style={{ width: '40px', height: '40px' }}/></a>

       <a href="https://www.facebook.com/kasidxch"  target="_blank"><img src={facebook} style={{ width: '40px', height: '40px' }}/></a>
      </div>

      <p className="footer-copy">© 2025 Sripatum University</p>
    </footer>
  );
};

export default AppFooter;