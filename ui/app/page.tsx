'use client'

/*********
 * ICONS *
 *********/
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import ShuffleIcon from "../components/ShuffleIcon"
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LinkIcon from "../components/LinkIcon"
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
/**************
 * Components *
 **************/
import Slider from "@mui/material/Slider";
import Track from "../components/Track";
import { useState } from 'react';

export default function Home() {
  const [is_current_track_local, setIs_current_track_local] = useState(true)
  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-around p-6">
      <div className="flex w-full h-8 items-center local-menu-1">
        <div className="flex flex-1 items-center gap-8">
          <button className="local-btn-1">
            <AddRoundedIcon/>
            add
          </button>
          <button className="local-btn-1">
            <QueueMusicRoundedIcon/>
            playlists
          </button>
          <span className="flex flex-1 items-center justify-center local-search-box">
            <label htmlFor="axd-wxpa-avuy" className="flex flex-[.7] items-center justify-center">
              <input id="axd-wxpa-avuy" className="flex-1" type='text' placeholder="search"/>
              <SearchRoundedIcon/>
            </label>
          </span>
        </div>
        <span className="flex gap-4">
          <button className="local-btn-2">
            <ShareRoundedIcon/>
          </button>
          <button className="local-btn-2">
            <SettingsRoundedIcon/>
          </button>
          <button className="local-btn-2">
            A
          </button>
        </span>
      </div>
      <div className="flex w-full h-8 items-end local-menu-2">
        <div className="flex flex-[.7]">
          <div className="flex flex-1 items-center">all Music</div>
          <span className="flex gap-2">
            <button className="gap-[.3rem] pr-[.5rem] pl-[.5rem] local-btn-3">
              shuffle
              <ShuffleIcon/>
            </button>
            <button className="pr-[.3rem] pl-[.5rem] local-btn-3">
              play
              <PlayArrowRoundedIcon/>
            </button>
          </span>
        </div>
        <div className="flex flex-[.3] h-full"></div>
      </div>
      <div className="flex flex-1 w-full gap-2">
        <div className="flex flex-[.7] flex-col gap-2 local-track-list">
          {renderTracks()}
        </div>
        <div className="flex flex-[.3] flex-col local-track-player">
          <div className="flex items-center justify-between">
            <span>
              {
                is_current_track_local
                ? (<DesktopWindowsRoundedIcon/>)
                : (<LinkIcon/>)
              }
            </span>
            <button className="local-menu-control">
              <MenuRoundedIcon/>
            </button>
          </div>
          <div className="flex flex-1 w-full p-4">
            <audio hidden></audio>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <Slider size="medium"/>
            </div>
            <div className="flex items-center justify-between">
              <span>--:--</span>
              <span>--:--</span>
            </div>
            <div className="flex items-center justify-center gap-4 local-media-control">
              <button className="local-btn-5">
                <SkipPreviousRoundedIcon/>
              </button>
              <button className="local-btn-4">
                <PlayArrowRoundedIcon/>
              </button>
              <button className="local-btn-5">
                <SkipNextRoundedIcon/>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button className="local-btn-6 local-volume-control">
                <VolumeMuteRoundedIcon/>
                <span className="h-4"></span>
                <span className="h-4"></span>
                <span className="h-4"></span>
                <span className="h-[.65rem]"></span>
                <span className="h-[.3rem]"></span>
              </button>
              <div className="flex gap-2 items-center justify-center">
                <button className="local-btn-6">
                  <CloseFullscreenRoundedIcon/>
                </button>
                <div className="flex items-center justify-center local-btn-6 local-vote-control">
                  <button>
                    <KeyboardDoubleArrowUpRoundedIcon/>
                  </button>
                  <button>
                    <KeyboardDoubleArrowDownRoundedIcon/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function renderTracks(data = Array(6)){
  let results = []
  for (let i = 0; i < data.length; i++) {
    // const element = data[i];
    results.push(<Track/>)
  }
  return results
}