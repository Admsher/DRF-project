import React, { useState } from "react";
import Easy from "./components/easy";
import Medium from "./components/medium";
import Hard from "./components/hard";
import VeryHard from "./components/veryhard";
import Questions from "./components/questions";

function Message({ generatedQuestions, setGeneratedQuestions }) {
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [veryhard, setVeryHard] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState([
    {
      id: 1,
      question: "What is the purpose of HTML in web development?",
      answer:
        "HTML (HyperText Markup Language) is used to structure content on the web. It provides the basic framework for creating web pages and web applications by defining elements such as headings, paragraphs, links, images, and other content.",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "How does CSS improve the appearance of a web page?",
      answer:
        "CSS (Cascading Style Sheets) is used to describe the presentation of a document written in HTML or XML. CSS allows developers to apply styles such as colors, fonts, and layouts to web pages, thereby improving their appearance and making them more visually appealing and user-friendly.",
      difficulty: "easy",
    },
    {
      id: 3,
      question:
        "What is JavaScript, and how is it used in front-end development?",
      answer:
        "JavaScript is a high-level, interpreted programming language that enables dynamic behavior on web pages. In front-end development, it is used to create interactive and responsive user interfaces by manipulating the DOM (Document Object Model), handling events, and making asynchronous requests to servers.",
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What are semantic HTML elements, and why are they important?",
      answer:
        "Semantic HTML elements are elements that clearly describe their meaning in a human- and machine-readable way. Examples include <article>, <section>, <header>, and <footer>. They improve the readability of the code, enhance accessibility, and provide better search engine optimization (SEO).",
      difficulty: "easy",
    },
    {
      id: 21,
      question: "What is the purpose of the <table> tag in HTML?",
      answer:
        "The <table> tag defines an HTML table and is used to display tabular data in rows and columns.",
      difficulty: "easy",
    },
    {
      id: 5,
      question:
        "What is the difference between class selectors and ID selectors in CSS?",
      answer:
        "In CSS, class selectors are denoted by a dot (.) and can be applied to multiple elements, allowing for reusable styles. ID selectors are denoted by a hash (#) and should be unique within a page, meaning they are intended for single-use styles.",
      difficulty: "easy",
    },
    {
      id: 22,
      question: "What is the purpose of the <form> tag in HTML?",
      answer:
        "The <form> tag is used to create an HTML form for user input. It can contain input elements like text fields, checkboxes, radio-buttons, submit buttons, etc.",
      difficulty: "medium",
    },
    {
      id: 6,
      question: "What is the role of the DOM in web development?",
      answer:
        "The DOM (Document Object Model) is a programming interface for web documents. It represents the structure of a document as a tree of objects, allowing developers to manipulate the content, structure, and style of a web page using scripting languages like JavaScript.",
      difficulty: "medium",
    },
    {
      id: 7,
      question: "Explain the concept of responsive web design.",
      answer:
        "Responsive web design is an approach to web development that ensures web pages render well on a variety of devices and window or screen sizes. This is achieved through the use of flexible layouts, fluid grids, media queries, and responsive images, allowing the content to adapt seamlessly to different screen sizes.",
      difficulty: "medium",
    },
    {
      id: 8,
      question: "What is the box model in CSS?",
      answer:
        "The box model in CSS describes the rectangular boxes generated for elements in the document tree. Each box consists of four parts: the content area, padding, border, and margin. Understanding the box model is essential for controlling the layout and spacing of elements on a web page.",
      difficulty: "medium",
    },
    {
      id: 9,
      question: "What is the purpose of the <!DOCTYPE html> declaration?",
      answer:
        "The <!DOCTYPE html> declaration is used to inform the browser about the version of HTML used in the document. In HTML5, <!DOCTYPE html> is the declaration to use.",
      difficulty: "medium",
    },
    {
      id: 10,
      question:
        "What is the difference between block-level and inline elements in HTML?",
      answer:
        "Block-level elements start on a new line and take up the full width available, while inline elements can start on the same line and only take up as much width as necessary.",
      difficulty: "medium",
    },
    {
      id: 11,
      question:
        "What is the purpose of the <head> element in an HTML document?",
      answer:
        "The <head> element contains meta-information about the HTML document, including the title, scripts, styles, meta information, and more.",
      difficulty: "hard",
    },
    {
      id: 12,
      question:
        "What is the difference between the 'class' and 'id' attributes in HTML?",
      answer:
        "The 'class' attribute is used to define equal styles for elements with the same class name, while the 'id' attribute is used to specify a unique id for an HTML element.",
      difficulty: "hard",
    },
    {
      id: 13,
      question: "What is the purpose of the <title> tag in HTML?",
      answer:
        "The <title> tag defines the title of the HTML document. The title is displayed in the browser's title bar or tab.",
      difficulty: "hard",
    },
    {
      id: 14,
      question: "What is the purpose of the <body> tag in an HTML document?",
      answer:
        "The <body> tag defines the document's body. It contains all the contents of an HTML document, such as text, hyperlinks, images, tables, lists, etc.",
      difficulty: "hard",
    },
    {
      id: 15,
      question: "What is the purpose of the <img> tag in HTML?",
      answer:
        "The <img> tag is used to embed images in an HTML page. It has attributes like 'src' (source), 'alt' (alternative text), 'height', and 'width'.",
      difficulty: "hard",
    },
    {
      id: 23,
      question: "What is the purpose of the <input> tag in HTML?",
      answer:
        "The <input> tag is used to create interactive controls for web-based forms in order to accept data from the user. It can vary in many ways, depending on the type attribute.",
      difficulty: "hard",
    },
    {
      id: 24,
      question: "What is the purpose of the <button> tag in HTML?",
      answer:
        "The <button> tag is used to create a clickable button within an HTML form on the web page.",
      difficulty: "hard",
    },
    {
      id: 16,
      question: "What is the purpose of the <a> tag in HTML?",
      answer:
        "The <a> tag defines a hyperlink, which is used to link from one page to another. The most important attribute of the <a> element is the 'href' attribute, which indicates the link's destination.",
      difficulty: "veryhard",
    },
    {
      id: 17,
      question: "What is the purpose of the <p> tag in HTML?",
      answer:
        "The <p> tag defines a paragraph in an HTML document. Browsers automatically add some space (margin) before and after each <p> element.",
      difficulty: "veryhard",
    },
    {
      id: 18,
      question: "What is the purpose of the <div> tag in HTML?",
      answer:
        "The <div> tag is a container unit that encapsulates other page elements and divides the HTML document into sections. Web developers use <div> elements to group together HTML elements and apply CSS styles to many elements at once.",
      difficulty: "veryhard",
    },
    {
      id: 19,
      question: "What is the purpose of the <span> tag in HTML?",
      answer:
        "The <span> tag is an inline container used to mark up a part of a text, or a part of a document. It can be used to group inline-elements in a document.",
      difficulty: "veryhard",
    },
    {
      id: 20,
      question: "What is the purpose of the <ul> and <ol> tags in HTML?",
      answer:
        "The <ul> tag is used to define an unordered list of items, while the <ol> tag is used to define an ordered list of items.",
      difficulty: "veryhard",
    },
    {
      id: 25,
      question: "What is the purpose of the <script> tag in HTML?",
      answer:
        "The <script> tag is used to embed or reference external JavaScript code within an HTML document.",
      difficulty: "veryhard",
    },
  ]);

  return (
    <div>
      {/* Question categories  w-[1217px] */}
      <div className="bg-dkblue my-6 mb-2 h-fit flex items-center px-5 p-2 justify-around rounded-md space-x-3">
        <Easy
          easy={easy}
          setEasy={setEasy}
          setTotalQuestions={setTotalQuestions}
          totalQuestions={totalQuestions}
        />
        <Medium
          medium={medium}
          setMedium={setMedium}
          setTotalQuestions={setTotalQuestions}
          totalQuestions={totalQuestions}
        />
        <Hard
          hard={hard}
          setHard={setHard}
          setTotalQuestions={setTotalQuestions}
          totalQuestions={totalQuestions}
        />
        <VeryHard
          veryhard={veryhard}
          setVeryHard={setVeryHard}
          setTotalQuestions={setTotalQuestions}
          totalQuestions={totalQuestions}
        />
        <button className="bg-white px-1 rounded-md">Finalize Questions</button>
      </div>
      {/* Question selection */}
      <h2 className="font-bold ml-4 text-dkblue">Select Questions</h2>
      <Questions
        totalQuestions={totalQuestions}
        setTotalQuestions={setTotalQuestions}
        setEasy={setEasy}
        setMedium={setMedium}
        setHard={setHard}
        setVeryHard={setVeryHard}
      />
    </div>
  );
}

export default Message;
