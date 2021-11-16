import styled from 'styled-components'

const Styles = styled.div`
  display: block;
  max-width: 100%;

  .tableWrap {
    max-width: 100%;
  }

  table {
    width: 100%;
    border-spacing: 0;

    th,
    td {
      padding: 0.5rem;
      border: 1px solid black;
      
    }
    td{
        word-break: break-all;
    }
    input, select{
        margin: 5px;
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

export default Styles;