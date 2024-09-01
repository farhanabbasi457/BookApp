import React from 'react';
import farhan from '../Images/farhan.jpeg';
import amman from '../Images/amman.png';
import jawad from '../Images/jawad.png';
import emaillogo from '../Images/emaillogo.png';
import phonelogo from '../Images/phonelogo.png';
import aboutimg from '../Images/aboutimg.jpg';

const About = () => {
  return (
    <div className="about-page">
      <img src={aboutimg}/>
      <p>Welcome to our Book App! We're passionate about books and reading, and we created this app to share our love of literature with you. Here's what you need to know about us:</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is to make reading more accessible, enjoyable, and interactive for book lovers everywhere. We believe in the power of storytelling to inspire, educate, and entertain.</p>

      <h2>What We Offer</h2>
      <p>Our Book App provides a wide range of features to enhance your reading experience:</p>
      <ul>
        <li>Search and discover new books</li>
        <li>Personalized book recommendations</li>
        <li>Book reviews and ratings</li>
        <li>Discussion forums and book clubs</li>
        <li>Reading challenges and goals</li>
        <li>Author interviews and articles</li>
      </ul>

      <h2>Meet the Team</h2>
      <p>We're a dedicated team of book enthusiasts who are committed to bringing you the best possible reading experience. Get to know us:</p>
      <ul>
        <li><img src={farhan} alt='pic'/><strong>Muhammad Farhan - CEO & Founder:</strong> Farhan is a lifelong reader and technology enthusiast who founded our Book App with the vision of connecting readers around the world.</li>
        <li><img src={amman} alt='pic'/><strong>Amman Sajjad- Head of Content:</strong> Amman oversees the curation of books, reviews, and articles on our platform to ensure a diverse and engaging selection for our users.</li>
        <li><img src={jawad} alt='pic'/><strong>Jawad Liaqat - Lead Developer:</strong> Jawad leads our talented team of developers in creating and maintaining the technical infrastructure of our Book App.</li>
      </ul>

      <h2>Contact Us</h2>
      <p>We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out to us:</p>
      <p><img src={emaillogo} alt='pic'/><span>   lovebookself1122@yourbookapp.com</span></p>
      <p><img src={phonelogo} alt='pic'/><span>   0318-5410340</span></p>
      
      <p id='plast'>Thank you for choosing our Book App. Happy reading!</p>
    </div>
  );
}

export default About;
