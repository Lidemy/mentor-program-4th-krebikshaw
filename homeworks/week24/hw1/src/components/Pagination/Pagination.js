import styled from "styled-components";
import usePost from "../../hooks/usePost";

const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageIcon = styled.a`
  margin: 0 5px;
  & img {
    width: 10px;
  }
`;

const CurrentPage = styled.div`
  margin: 0 10px;
  color: #333;
`;

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    handleChangePage
  } = usePost();

  const handleJumpToFirstPage = () => {
    handleChangePage(1);
  }
  const handleJumpToLastPage = () => {
    handleChangePage(totalPages);
  }
  const handleJumpToPreviousPage = () => {
    if (currentPage == 1) return;
    handleChangePage(currentPage - 1);
  }
  const handleJumpToNextPage = () => {
    if (currentPage == totalPages) return;
    handleChangePage(currentPage + 1);
  }
  
  return (
    <PagingContainer>
      <PageIcon onClick={handleJumpToFirstPage}><img src="first.svg" /></PageIcon>
      <PageIcon onClick={handleJumpToPreviousPage}><img src="previous.svg" /></PageIcon>
      <CurrentPage>頁碼：{currentPage} / {totalPages}</CurrentPage>
      <PageIcon onClick={handleJumpToNextPage}><img src="next.svg" /></PageIcon>
      <PageIcon onClick={handleJumpToLastPage}><img src="last.svg" /></PageIcon>
    </PagingContainer>
  )
}

export default Pagination;