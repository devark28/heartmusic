import Track from "../components/Track";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-6">
      <div className="flex w-full h-8 items-center local-menu-1">
        <div className="flex flex-1 items-center gap-8">
          <button className="local-btn-1">add</button>
          <button className="local-btn-1">playlists</button>
          <label htmlFor="axd-wxpa-avuy" className="flex flex-1 items-center justify-center local-search-box">
            <input id="axd-wxpa-avuy" className="flex-[.7]" type='text' placeholder="search"/>
          </label>
        </div>
        <span className="flex gap-4">
          <button className="local-btn-2">share</button>
          <button className="local-btn-2">settings</button>
          <button className="local-btn-2">account</button>
        </span>
      </div>
      
      <div className="flex w-full h-8 items-center local-menu-2">
        <div className="flex flex-[.7]">
          <div className="flex flex-1 items-center">all Music</div>
          <span className="flex gap-2">
            <button className="local-btn-3">shuffle</button>
            <button className="local-btn-3">play</button>
          </span>
        </div>
        <div className="flex flex-[.3] h-full"></div>
      </div>
      <div className="flex flex-1 w-full gap-2">
        <div className="flex flex-[.7] flex-col gap-2 local-track-list">
          <Track/>
          <Track/>
          <Track/>
          <Track/>
          <Track/>
        </div>
        <div className="flex flex-[.3] flex-col local-track-player">
          <div className="flex items-center justify-between">
            <span>source:link/local</span>
            <span>menu</span>
          </div>
          <div className="flex flex-1 w-full p-4"></div>
          <div className="flex flex-col w-full">
            <div>
              <input type="range" className="w-full"/>
            </div>
            <div className="flex items-center justify-between">
              <span>--:--</span>
              <span>--:--</span>
            </div>
            <div className="flex items-center justify-center gap-4 local-media-control">
              <button className="local-btn-5">previous</button>
              <button className="local-btn-4">play</button>
              <button className="local-btn-5">next</button>
            </div>
            <div className="flex items-center justify-between">
              <button className="local-btn-6">volume</button>
              <div className="flex gap-2 items-center justify-center">
                <button className="local-btn-6">miniplayer</button>
                <div className="flex items-center justify-center local-btn-6 local-vote-control">
                  <button>upvote</button>
                  <button>downvote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
