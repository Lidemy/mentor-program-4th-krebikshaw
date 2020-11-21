import styled from "styled-components";

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

const Paging = ({ page, handleChangePage }) => {
 
  const handleJumpToFirstPage = () => {
    handleChangePage(1);
  }
  const handleJumpToLastPage = () => {
    handleChangePage(page.totalPages);
  }
  const handleJumpToPreviousPage = () => {
    handleChangePage(page.currentPage - 1);
  }
  const handleJumpToNextPage = () => {
    handleChangePage(page.currentPage + 1);
  }
  
  return (
    <PagingContainer>
      <PageIcon onClick={handleJumpToFirstPage}><img src="first.svg" /></PageIcon>
      <PageIcon onClick={handleJumpToPreviousPage}><img src="previous.svg" /></PageIcon>
      <CurrentPage>頁碼：{page.currentPage} / {page.totalPages}</CurrentPage>
      <PageIcon onClick={handleJumpToNextPage}><img src="next.svg" /></PageIcon>
      <PageIcon onClick={handleJumpToLastPage}><img src="last.svg" /></PageIcon>
    </PagingContainer>
  )
}

export default Paging;