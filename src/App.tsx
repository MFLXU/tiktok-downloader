import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [downloadLink, setDownloadLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [errormsg, setErrorMsg] = useState("");
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
      <div className="navbar bg-primary">
        <div className="container">
          <a className="btn btn-ghost normal-case text-white text-xl">
            Tiktok Downloader
          </a>
        </div>
      </div>
      <div className="container">
        <div className="mt-20 flex items-center justify-center flex-col">
          <h1 className="text-6xl font-extrabold">TikTok Downloader</h1>
          <p className="text-2xl mt-2">
            Start by pasting in the TikTok Url down below.
          </p>
          <div className="my-8 form-control">
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
            <div className="card w-96 bg-base-100 shadow-xl border">
              <div className="p-4 flex items-center justify-center flex-col">
                <div className="flex items-center justify-center mb-8 flex-col">
                  <p className="text-xl link-primary">Download video of</p>
                  <h2 className="card-title text-3xl font-extrabold">{name}</h2>
                  <p className="text-gray-400 font-bold">@{username}</p>
                </div>

                <div className="card-actions justify-center ">
                  <a href={downloadLink} className="btn btn-wide btn-primary">
                    Download
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
