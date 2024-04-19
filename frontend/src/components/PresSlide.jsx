import React from 'react';
import axios from 'axios';
import Textbox from './Textbox';
import ImageBox from './ImageBox';
import VideoBox from './VideoBox';
import CodeBox from './CodeBox';

const PresSlide = ({ token, presId, presTitle }) => {
  const [textBoxes, setTextBoxes] = React.useState({});
  const [images, setImages] = React.useState({});
  const [videos, setVideos] = React.useState({});
  const [code, setCodes] = React.useState({});

  // Load up data for textboxes, images, videos and CODE
  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      setTextBoxes(response.data.store[presId].content.slide1.text);
      setImages(response.data.store[presId].content.slide1.image);
      setVideos(response.data.store[presId].content.slide1.video);
      setCodes(response.data.store[presId].content.slide1.code);
    })
  }, []);

  return (
    <>
      <div id="pres-slide" style={{ height: '700px', width: '1000px', backgroundColor: 'white', border: '1px solid black' }}>
        {textBoxes && Object.entries(textBoxes).map(textBox => (
          <Textbox
              key={textBox.id}
              height={textBox[1].height}
              width={textBox[1].width}
              text={textBox[1].text}
              fontSize={textBox[1].fontSize}
              textColour={textBox[1].textColour}
              textId={textBox[0]}
              presId={presId}
              presTitle={presTitle}
              token={token}
          />
        ))}

        {images && Object.entries(images).map(image => (
          <ImageBox
              key={image.id}
              height={image[1].height}
              width={image[1].width}
              url={image[1].url}
              alt={image[1].alt}
              imageId={image[0]}
              presId={presId}
              presTitle={presTitle}
              token={token}
          />
        ))}

        {videos && Object.entries(videos).map(video => (
          <VideoBox
              key={video.id}
              height={video[1].height}
              width={video[1].width}
              url={video[1].url}
              autoplay={video[1].autoplay}
              videoId={video[0]}
              presId={presId}
              presTitle={presTitle}
              token={token}
          />
        ))}

        {code && Object.entries(code).map(codeBlock => (
          <CodeBox
              key={codeBlock.id}
              height={codeBlock[1].height}
              width={codeBlock[1].width}
              code={codeBlock[1].code}
              fontSize={codeBlock[1].fontSize}
              codeBlockId={codeBlock[0]}
              presId={presId}
              presTitle={presTitle}
              token={token}
          />
        ))}
      </div>
    </>
  );
}

export default PresSlide;
