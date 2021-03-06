import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationTable = (props) => {
  const { totalPage } = props;
  const [pageFirst, setPageFirst] = useState(true);
  const [pageLast, setPageLast] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pages, setPages] = useState([]);
  const [limitPage, setLimitPage] = useState(10);

  // useEffect(() => {

  //   (() => loadingPages(1, totalPage))();
  // }, [totalPage]);

  //Criar as pages da paginação
  const loadingPages = (start = 1, limit = 10) => {
    let arrayPage = [];
    for (let i = start; i <= limit; i++) {
      arrayPage.push(i);
    }
    if (limitPage < totalPage) {
      if (pages[0] > 1) {
        setPages(["...", ...arrayPage, "..."]);
      } else {
        setPages([...arrayPage, "..."]);
      }
      setPages([...arrayPage, "..."]);
    } else {
      setPages(arrayPage);
    }
  };

  useEffect(() => {
    (() => {
      pageCurrent > 1 ? setPageFirst(false) : setPageFirst(true);
      limitPage <= totalPage ? setPageLast(false) : setPageLast(true);
    })();
  }, [pageCurrent, limitPage, totalPage]);

  // Page corrente
  const handlePageCurrent = (page, index) => {
    if (page === "...") {
      index <= 0 ? previous() : next();
    } else {
      setPageCurrent(page);
      props.onChange(page);
    }
  };

  // Inicio da paginação
  const first = () => {
    loadingPages();
    setLimitPage(10);
    setPageCurrent(1);
    props.onChange(1);
  };
  // Retornar pagina anterior
  const previous = () => {
    const page = pages.filter((item) => item !== "...");
    const newPage = pageCurrent - 1;
    if (page[0] > 1 && pageCurrent === page[0]) {
      page.pop();
      newPage > 1
        ? setPages(["...", pageCurrent - 1, ...page, "..."])
        : setPages([pageCurrent - 1, ...page, "..."]);
      limitPage > 10 ? setLimitPage(pageCurrent - 1) : setLimitPage(10);
      setPageCurrent(newPage);
      props.onChange(newPage);
    } else {
      pageCurrent > 1 && setPageCurrent(pageCurrent - 1);
      props.onChange(newPage);
    }
  };
  // Ir para próxima pagina
  const next = () => {
    const newPage = pageCurrent + 1;
    if (pageCurrent < limitPage) {
      setPageCurrent(newPage);
    } else {
      // Chegou no final desabilita o botão
      if (limitPage === totalPage) {
        setPageLast(false);
      } else {
        const page = pages.filter((item) => item !== "...");
        page.shift(); //Remover primeiro elemento do array
        newPage < totalPage
          ? setPages(["...", ...page, newPage, "..."])
          : setPages(["...", ...page, newPage]);
        limitPage < totalPage && setLimitPage(newPage);
        setPageCurrent(newPage);
      }
    }
    props.onChange(newPage);
  };
  // Ir para última pagina
  const last = () => {
    const start = totalPage <= 10 ? 1 : totalPage - 10;
    setLimitPage(totalPage);
    loadingPages(start, totalPage);
    setPageCurrent(totalPage);
    props.onChange(totalPage);
  };

  return (
    <Pagination>
      <PaginationItem disabled={pageFirst}>
        <PaginationLink first onClick={() => first()} />
      </PaginationItem>
      <PaginationItem disabled={pageFirst}>
        <PaginationLink previous onClick={() => previous()} />
      </PaginationItem>

      {pages.map((page, idx) => (
        <PaginationItem key={idx} active={page === pageCurrent ? true : false}>
          <PaginationLink onClick={() => handlePageCurrent(page, idx)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={pageLast}>
        <PaginationLink next onClick={() => next()} />
      </PaginationItem>
      <PaginationItem disabled={pageLast}>
        <PaginationLink last onClick={() => last()} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationTable;
