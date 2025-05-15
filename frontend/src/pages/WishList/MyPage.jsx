import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../styles/MyPage.style.css";
import { Alert, Button } from 'react-bootstrap';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMyInfoQuery } from '../../hooks/useMyInfoQuery';
import { useLocationMutation } from '../../hooks/useLocationMutation';
import SingleLineCarousel from '../../common/react-multi-carousel/SingleLineCarousel';
import { useReadingBooksQuery } from '../../hooks/useReadingBooks';
import { useNavigate } from 'react-router';
import { useLikedBooksQuery } from '../../hooks/useLikedBooks';
import { useBorrowingBooksQuery } from '../../hooks/useBorrowingBooks';

const MyPage = () => {
  const [form, setForm] = useState({ location: "" });
  const { data:mydata, isLoading, isError, error } = useMyInfoQuery();
  const { data:readingdata } = useReadingBooksQuery();
  const { data:borrowdata } = useBorrowingBooksQuery();
  const { data:likedata } = useLikedBooksQuery();
  const { mutate: updateLocation } = useLocationMutation();
  const navigate = useNavigate();

  //내서재 더보기
  const moveToLibrary = () => {
    navigate(`/library`);
  }

  //위치정보
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.address;
          const city = address.city || address.town || address.state || "";
          const district =
            address.suburb || address.village || address.neighbourhood || "";
          const location = `${city} ${district}`;
          setForm({ location });

          // 백엔드에 전송
          updateLocation(location);
        } catch {
          setForm({ location: "위치 정보 불러오기 실패" });
        }
      });
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div>
      <Container className='mypage-container'>
        <Row>
          <Col lg={12}>
            <div className='info-area'>
              <h1 className='mypage-title'>내 정보</h1>
              <div className='my-info'>
                <h2>{mydata.nickname}님</h2>
                <div>이름: {mydata.name}</div>
                <div>이메일: {mydata.email}</div>
                <div className='my-location'>
                  <div><FontAwesomeIcon icon={faLocationDot} style={{color: "#4B4B4B",}} /><span>{mydata.location}</span></div>
                  <Button variant="primary" onClick={getLocation}>지역 변경</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className='go-library'>
              <h1 className='mypage-title'>내 서재</h1>
              <button onClick={moveToLibrary} className='my-lib'>더보기</button>
            </div>
            <div>
            {readingdata?.length > 0 && (<SingleLineCarousel books={readingdata} />)}
            </div>
          </Col>
        </Row>
        <Row className="rental-book">
          <Col lg={12}>
            <h1 className='mypage-title'>대여중인 책</h1>
            <div>
            {borrowdata?.length > 0 && (<SingleLineCarousel books={borrowdata} />)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <h1 className='mypage-title'>좋아요 한 책</h1>
            <div>
            {likedata?.length > 0 && (<SingleLineCarousel books={likedata} />)}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MyPage