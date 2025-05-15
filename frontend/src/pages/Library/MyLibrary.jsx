import React from "react";
import "../../styles/MyLibrary.style.css";
import { useMyInfoQuery } from "../../hooks/useMyInfoQuery";
import { Alert } from "react-bootstrap";
import SingleLineCarousel from "../../common/react-multi-carousel/SingleLineCarousel";
import { useReadingBooksQuery } from "../../hooks/useReadingBooks";
import { useFinishedBooksQuery } from "../../hooks/useFinishedBooks";
import { useLendedBooksQuery } from "../../hooks/useLendedBooks";

const MyLibrary = () => {
  const { data: mydata, isLoading, isError, error } = useMyInfoQuery();

  const { data: readingdata } = useReadingBooksQuery();
  const { data: finisheddata } = useFinishedBooksQuery();
  const { data: lendeddata } = useLendedBooksQuery();

  console.log("data", mydata);
  console.log("rb", readingdata);
  console.log("fb", finisheddata);
  console.log("lb", lendeddata);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <Alert variant="danger">불러오기 실패: {error.message}</Alert>;

  return (
    <div className="libraryContainer container">
      <h1 className="libraryNameTitle">{mydata.nickname}님의 서재</h1>
      <div className="section mt-3">
        <h3 className="libraryTitle mb-3">읽고 있는 도서</h3>
        <div className="libraryBoxStroke libraryBookList">
          <div>
            {readingdata?.length > 0 && (
              <SingleLineCarousel books={readingdata} />
            )}
          </div>
        </div>
      </div>
      <div className="section mt-5">
        <h3 className="libraryTitle mb-3">완독 도서</h3>
        <div className="libraryBoxStroke libraryBookList">
          <div>
            {finisheddata?.length > 0 && (
              <SingleLineCarousel books={finisheddata} libraryBookStatus="finished"/>
            )}
          </div>
        </div>
      </div>
      <div className="section mt-5">
        <h3 className="libraryTitle mb-3">빌려준 도서</h3>
        <div className="libraryBoxStroke libraryBookList">
          <div>
            {lendeddata?.length > 0 && (
              <SingleLineCarousel books={lendeddata} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
