import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [downloadLink, setDownloadLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const downloadLinkHandler = () => {
    const options = {
      method: "GET",
      url: "https://tiktok-downloader-download-videos-without-watermark1.p.rapidapi.com/media-info/",
      params: { link: tiktokLink },
      headers: {
        "X-RapidAPI-Key": "69c451b96bmsh72681dd594b9937p1ca2f1jsna21a80c202c5",
        "X-RapidAPI-Host":
          "tiktok-downloader-download-videos-without-watermark1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setDownloadLink(response.data.result.video.url_list[0]);
        setUsername(response.data.result.aweme_detail.author.unique_id);
        setName(response.data.result.aweme_detail.author.nickname);
        setProfileImage(
          response.data.result.aweme_detail.author.avatar_large.url_list[0]
        );
        setThumbnail(response.data.result.aweme_detail.video.cover.url_list[0]);
      })
      .then(() => {
        console.log(name, username, profileImage, thumbnail);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const tiktokLinkHandler = (e: any) => {
    setTiktokLink(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          tiktokLinkHandler(e);
        }}
      />
      <button
        onClick={() => {
          downloadLinkHandler();
        }}
      >
        search
      </button>
      {downloadLink ? (
        <div>
          <a target="_blank" href={downloadLink}>
            download
          </a>
          <p>{name}</p>
          <p>{username}</p>
          <img src={profileImage || ""} alt="" />
          <img src={thumbnail || ""} alt="" />
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default App;
