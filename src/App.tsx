import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [downloadLink, setDownloadLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [postDesc, setPostDesc] = useState("");
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
        setPostDesc(response.data.result.aweme_detail.desc);
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
      <div className="container">
        <div className="mt-20">
          <div className="form-control">
            <div className="input-group">
              <input
                onChange={(e) => {
                  tiktokLinkHandler(e);
                }}
                type="text"
                placeholder="Search for tiktok…"
                className="input input-bordered"
              />
              <button
                onClick={() => {
                  downloadLinkHandler();
                }}
                className="btn btn-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {downloadLink ? (
            <div>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p>{username}</p>
                  <p>{postDesc}</p>
                  <div className="card-actions justify-end">
                    <a href={downloadLink} className="btn btn-primary">
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
