import React  from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import BookCard from '../../common/BookCard/BookCard';
import '../../styles/RentalList.style.css'
import { useNavigate } from 'react-router-dom'
import { useLendableBooksQuery } from '../../hooks/uselendable';
import useBookByIDs from '../../hooks/useBookbyIDArray';



const RentalList = () => {
  const navigate = useNavigate()

  //대여가능도서목록 데이터 가져오기
  const { data:lendabledata } = useLendableBooksQuery();
  //아이디만 뽑아와서 배열로 만들기
  const bookIds = lendabledata?.map(item => item.bookId) || [];
  //배열을 보내서 상응하는 알라딘 데이터로 가져오기
  const bookQueries = useBookByIDs(bookIds);

  // 로딩 여부 확인
const isLoading = bookQueries.some(q => q.isLoading);

// 에러 여부 확인
const isError = bookQueries.some(q => q.isError);

// 데이터만 추출
const books = bookQueries
  .filter(q => q.isSuccess && q.data)
  .map(q => q.data);

  // console.log("렌탈데이터",books);

  const displayBooks = books;

  if (isLoading) return <p>로딩 중…</p>
  if (isError) {
    const firstError = bookQueries.find(q => q.isError)?.error;
    return <p>에러 발생: {firstError?.message}</p>;
  }

  return(
    <>
    <Container className="py-4 rental-container">
      <Row className="align-items-center mb-5">
        <Col xs={12} md="auto">
          <strong className="rental-list">대여 가능 도서 목록</strong>
        </Col>
      </Row>

      <Row xs={1} sm={3} md={5} className="gx-1 gy-1 justify-content-center justify-content-sm-start">
        {displayBooks.map(book => (
          <BookCard
            key={book.itemId || book.id}                       
            book={book}                            
          />
        ))}
      </Row>
      {displayBooks.length === 0 && (
        <p className="text-center mt-5">검색 결과가 없습니다.</p>
      )}
    </Container>
    </>
  )
}

export default RentalList