import $ from 'jquery';

const documentHead = (
  typeof window !== 'undefined' &&
    window.document.head &&
    $(window.document.head)
);

export default documentHead;
