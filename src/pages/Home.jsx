import React from 'react';
import './Home.css'; 
import human from "/img/Human.png";
const Home = () => {
  return (
    <div className="home-container">
      <div className="profile-card">
        
        <img 
          src={human} 
          alt="รูปโปรไฟล์ของกษิดิ์เดช"
          className="profile-pic"
        />
        
        <h1 className="profile-name">กษิดิ์เดช เนียมทอง (เพียว)</h1>
        <p className="student-id">รหัสนักศึกษา: 67117355</p>
        
        <div className="education-info">
          <p>ชั้นปีที่ 2</p>
          <p>สาขาวิทยาการคอมพิวเตอร์ (การพัฒนาซอฟต์แวร์)</p>
          <p>คณะเทคโนโลยีสารสนเทศ | มหาวิทยาลัยศรีปทุม</p>
        </div>
        
        <p className="profile-intro">
          "ผมชื่อน้องเพียวครับ"
        </p>
      </div>
    </div>
  );
}

export default Home;

