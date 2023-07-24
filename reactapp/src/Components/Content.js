import React from "react";
import './Content.css'
const Content = ({ searchTerm }) => {
  const contents = [
    {
      title: 'Cool Tracks',
      Image: "data:image/jpeg;base64,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"
    },
    {
      title: 'Popular',
      Image: "data:image/jpeg;base64,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"
    },
    {
      title: 'Covers',
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_KQYhkcfTJg0KvDv6PjsXxyjqtwbwV7A4A&usqp=CAU"
    },

    {
      title: 'Latest Hits',
      Image: "data:image/jpeg;base64,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"
    },
    {
      title: 'Tunes',
      Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y4FwXLSQqd70U5ujpLcRQjy6IGNzl3Co-g&usqp=CAU"
    },
    {
      title: 'Long Drive',
      Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Ot5fxXEkJye48KEIcGpjMYlTT1LY74XcEN7nhwGaxmsaxX8tVcvl8z2W4YAzPSkWGoQ&usqp=CAU"
    },

   
  ];


  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    
      <div className="imagelist">
      {filteredContents.map((content, index) => (
        <div  key={index}>
          {content.Image && 
          <img src={content.Image} value={content.title} alt={content.title} />
        }
           <br />
           <h5>{content.title}</h5></div>
      ))}
      
      </div>
    </div>
  );
};

export default Content;
