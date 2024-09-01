import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import BaseUrl from '../../BaseUrl';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Bookdetail = () => {

  const { state } = useLocation();
  const { img, booktitle, bookdes, pdf2, id, author, person1, start_time } = state || {};

  const [check, setcheck] = useState(false);
  const [endtime, setendtime] = useState('');

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);



  const photo = author.photo ? author.photo.replace("public\\", "") : '';
  const halfpath = `${BaseUrl}/`;
  const fullpath = halfpath + photo;


  const handleOnclickIcon = async () => {
    try {
      console.log(pageNumber);
      const getresp = await axios.get(`${BaseUrl}/bookmark?user_ID=${person1._id}&book_ID=${encodeURIComponent(id)}`);

      if (getresp.data.message === 1) {
        const response = await axios.post(`${BaseUrl}/bookmark`, {
          user_ID: person1._id,
          book_ID: id,
          page_number: pageNumber
        });

        if (response.data.message === 1) {
          alert("Bookmark Added");
          setcheck(true);
        }
      }
      else {
        alert("Bookmark Already Added");
        setcheck(true);
      }

    }
    catch (error) {
      console.error('Error during login:', error);
      setcheck(false);
    }


  }
  const handleOnclickIcon2 = async () => {
    try {
      const getresp = await axios.delete(`${BaseUrl}/bookmark?user_ID=${person1._id}&book_ID=${encodeURIComponent(id)}`);
      if (getresp.data.message === 1) {
        alert("Bookmark Removed");
        setcheck(false);
      }
      else {
        alert("Bookmark Not Exists");
        setcheck(false);
      }

    }
    catch (error) {
      console.error('Error during login:', error);
      setcheck(true);
    }
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  console.log("pg num", pageNumber);
  const storing = async (paging) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const endingtime = year + '-' + month + '-' + day + " " + hours + ':' + minutes + ':' + seconds;
    setendtime(endingtime);
    console.log(endingtime);

    try {
      console.log("pages hitory", paging)
      const getresp = await axios.get(`${BaseUrl}/readinghistory?user_ID=${person1._id}&book_ID=${encodeURIComponent(id)}`);
      if(getresp.data.message === 0){
        console.log("Post",paging);
        const getresp1 = await axios.post(`${BaseUrl}/readinghistory`, {
        user_ID: person1._id,
        book_ID: id,
        start_time: start_time,
        end_time: endingtime,
        pages_read: paging,
      });
      if (getresp1.data.message === 1) {
        console.log("Thanks for Reading the book");
      }
      else{
        console.log("Error");
      }
      }
      else{
        console.log("Update",paging);
        const getresp1 = await axios.put(`${BaseUrl}/readinghistory?user_ID=${person1._id}&book_ID=${encodeURIComponent(id)}`, {
        user_ID: person1._id,
        book_ID: id,
        start_time: start_time,
        end_time: endingtime,
        pages_read: paging,
      });
      if (getresp1.data.message === 1) {
        console.log("Thanks for Reading the book");
      }
      else{
        console.log("Error");
      }
      }
      
    }
    catch (error) {
      console.error('Error during login:', error);
    }
  }

  const goToPrevPage = () => {
    const newPageNumber = Math.max(pageNumber - 1, 1);
    setPageNumber(newPageNumber);
    console.log("Previous page", newPageNumber);
    storing(newPageNumber);
  };

  const goToNextPage = () => {
    const newPageNumber = Math.min(pageNumber + 1, numPages);
    setPageNumber(newPageNumber);
    console.log("Next page", newPageNumber);
    storing(newPageNumber);
  };




  useEffect(() => {
    window.scrollTo(0, 0);
    const tempfunct = async () => {
      try {
        const getresp = await axios.get(`${BaseUrl}/bookmark?user_ID=${person1._id}&book_ID=${encodeURIComponent(id)}`);
        if (getresp.data.message === 0) {
          setcheck(true);
        }
        else {
          setcheck(false);
        }
      }
      catch (error) {
        console.error('Error during login:', error);
        setcheck(false);
      }

    }
    const tempfunct2 = async () => {
      try {
        const getresp = await axios.get(`${BaseUrl}/readinghistory?user_ID=${person1._id}&book_ID=${encodeURIComponent(id)}`);
        if (getresp.data.message === 0) {
          console.log("No History Found. Book Start From Page 1");
        }
        else {
          const dataa = getresp.data.message[0].pages_read;
          setPageNumber(dataa);
          console.log("jelo", dataa);
        }
      }
      catch (error) {
        console.error('Error during login:', error);
        setcheck(false);
      }

    }

    tempfunct();
    tempfunct2();


  }, [])

 

  console.log("pageNumber", pageNumber);

  

  return (

    <section className='bookd'>

      <div>
        <div className='imgdiv'>
          <img src={img} alt={booktitle} />
        </div>

        <div className='nextdet'>
          <h2>{booktitle}</h2>
          <p>{bookdes}</p>
        </div>
      </div>
      <h1 id='h2'>Author Details</h1>
      <div>
        <div className='imgdiv'>
          <img src={fullpath} alt={"helo"} />
        </div>

        <div className='nextdet'>
          <h2>{author.name}</h2>
          <p>{author.biography}</p>
        </div>
      </div>

      <h1 id='h2'>Read The Book Here....</h1>
      {check ?
        <IoStarSharp className='bookmarkIcon' onClick={handleOnclickIcon2} /> :
        <IoStarOutline className='bookmarkIcon' onClick={handleOnclickIcon} />
      }


      <p className='pdf'>
        <div className='file'>
          <Document file={pdf2} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />

          </Document>

          <p className='pgnum'>
            Page {pageNumber} of {numPages}
          </p>

          <div>
            <button className='button' onClick={goToPrevPage} disabled={pageNumber === 1}>Previous</button>
            <button className='button' onClick={goToNextPage} disabled={pageNumber === numPages}>Next</button>
          </div>

        </div>
      </p>



    </section>
  )
}

export default Bookdetail