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
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Home() {
  const [is_current_track_local, setIs_current_track_local] = useState(true)
  const [volume, setVolume] = useState(10);
  const [initial_volume, setInitial_volume] = useState(volume);
  const [playing, setPlaying] = useState(true)
  const [playlist, setPlaylist] = useState(Array())
  const [current_track, setCurrent_track] = useState(0)
  const [muted, setMuted] =  useState(true)
  
  const [started, setStarted] =  useState(false)
  const [ready, setReady] =  useState(false)
  const [progress, setProgress] =  useState(0)
  const [duration, setDuration] =  useState(0)
  const [timeStamp, setTimeStamp] =  useState([0, 0, 0])
  const [was_playing, set_was_playing] =  useState(false)
  const video_player_ref:MutableRefObject<string> = useRef("video_player_ref")

  useEffect(() => {
    setPlaylist([
      "/audios/dubstep_violin_lindsey_stirling_crystallize_mp3_53985.mp3",
      "/audios/eva_simons_ft._konshens_policeman_lyric_video_mp3_47931.mp3",
      "/audios/pitbull_with_enrique_iglesias_messin_around_official_video_mp3_54201.mp3",
      "/audios/war classic (3).mp3",
    ])
  }, [])
  

  const volumeRenderer = (low:number, high:number):string => {
    if(volume >= high){
      return "h-4"
    }else if(volume < high && volume == low){
      return "h-[.7rem]"
    }else if(volume < low){
      return "h-[.3rem]"
    }
    return ""
  }

  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-around p-6 bg-neutral-950 text-white fill-white">
      <div className="flex w-full h-8 items-center local-menu-1">
        <div className="flex flex-1 items-center gap-8">
          <button className="local-btn-1 border-transparent bg-neutral-600">
            <AddRoundedIcon/>
            add
          </button>
          <button className="local-btn-1 border-transparent bg-neutral-600">
            <QueueMusicRoundedIcon/>
            playlists
          </button>
          <span className="flex flex-1 items-center justify-center local-search-box">
            <label htmlFor="axd-wxpa-avuy" className="flex flex-[.7] items-center justify-center">
              <input id="axd-wxpa-avuy" className="flex-1 bg-transparent" type='text' placeholder="search"/>
              <SearchRoundedIcon className="text-neutral-600"/>
            </label>
          </span>
        </div>
        <span className="flex gap-4">
          <button className="local-btn-2 hover:bg-neutral-800">
            <ShareRoundedIcon/>
          </button>
          <button className="local-btn-2 hover:bg-neutral-800">
            <SettingsRoundedIcon/>
          </button>
          <button className="local-btn-2 hover:bg-neutral-800">
            A
          </button>
        </span>
      </div>
      <div className="flex w-full h-8 items-end local-menu-2">
        <div className="flex flex-[.7]">
          <div className="flex flex-1 items-center">all Music</div>
          <span className="flex gap-2">
            <button className="gap-[.3rem] pr-[.5rem] pl-[.8rem] local-btn-3 bg-neutral-700">
              shuffle
              <ShuffleIcon/>
            </button>
            <button className="pr-[.3rem] pl-[.8rem] local-btn-3 bg-neutral-700">
              play
              <PlayArrowRoundedIcon/>
            </button>
          </span>
        </div>
        <div className="flex flex-[.3] h-full"></div>
      </div>
      <div className="flex flex-1 w-full gap-2">
        <div className="flex flex-[.7] flex-col gap-2 local-track-list bg-neutral-800">
          {renderTracks()}
        </div>
        <div className="flex flex-[.3] flex-col local-track-player bg-neutral-800">
          <div className="flex items-center justify-between">
            <button>
              {
                is_current_track_local
                ? (<DesktopWindowsRoundedIcon/>)
                : (<LinkIcon/>)
              }
            </button>
            <button className="local-menu-control">
              <MenuRoundedIcon/>
            </button>
          </div>
          <div className="flex flex-1 w-full p-4">
          <ReactPlayer
          ref={video_player_ref}
          onReady={() => {
            // setPreview(true)
            console.log("ready");
          }}
          pip={false}
          onDuration={(dur)=>{
            console.log("Buffer end -- " + dur);
            // setDuration(dur)
          }}
          config={{ file: { attributes: { controlsList: 'nodownload', disablePictureInPicture: true, preload: "none" } } }}
          onStart={()=>{
            // setDuration(video_player_ref.current.getDuration())
            // video_player_ref.current.seekTo(time_stamp, "seconds")

            if(!started && (duration > 0) && !ready){
              setPlaying(false)
              setMuted(false)
              video_player_ref.current.seekTo(0, "seconds")
              setProgress(0)
              setReady(true)
            }else{
              // setStarted(true)
            }
          }}
          onEnd={()=>{
            console.log("end");
          }}
          // onPlay={()=>{console.log("playing")}}
          // onPause={()=>console.log("pausing")}
          onProgress={(state)=>{
            // (state.played * 100).toFixed(5)
            // setProgress((state.played * 100).toFixed(5))
            // console.log("1", state.playedSeconds)
            // console.log("2", state.played * 100)
            // console.log("3", state.played)
            // setProgress(state.playedSeconds)
            // set_time_stamp(state.playedSeconds)
            const time = state.playedSeconds
            const hours = Math.trunc(time / 3600)
            const minutes = Math.trunc(((time / 3600) - hours) * 60)
            const seconds = Math.trunc(((((time / 3600) - hours) * 60) - minutes) * 60)
            setTimeStamp([hours, minutes, seconds])
            // console.log("time", hours, minutes, seconds)
          }}
          onBuffer={()=>{
            console.log("buffering");
          }}
          onBufferEnd={()=>{
            console.log("end buffering");
          }}
          // wrapper={Fragment}
          onClick={()=>{
              // set_is_playing(!is_playing)
          }}
          className="flex relative w-[auto!important] h-[auto!important]"
          url={playlist[current_track]}
          volume={volume/10}
          playing={playing}
          muted={muted}
          loop={false}
          controls/>
          </div>
          <div className="flex flex-col w-full">
            <div>
              <Slider size="medium" step={0.000001} min={0} max={100}
              value={progress}
              onMouseDown={()=>{
                if(playing){
                    set_was_playing(true)
                }else{
                    set_was_playing(false)
                }
                // console.log(was_playing)
                setPlaying(false)
              }}
              onChange={(e:Event) => {
                video_player_ref.current.seekTo((e.target?.value) * duration / 100, "seconds")
                setProgress(e.target?.value)
                console.log(progress, e.target?.value , (e.target?.value) * duration / 100);
              }}
              onMouseUp={()=>{
                if(was_playing){
                    setPlaying(true)
                }else{
                    setPlaying(false)
                }
              }}/>
            </div>
            <div className="flex items-center justify-between">
              <span>--:--</span>
              <span>--:--</span>
            </div>
            <div className="flex items-center justify-center gap-4 local-media-control">
              <button className="local-btn-5 bg-neutral-700" onClick={() => {
                if(current_track > 0){
                  setCurrent_track(current_track-1)
                }
              }}>
                <SkipPreviousRoundedIcon/>
              </button>
              <button className="local-btn-4 bg-neutral-600" onClick={() => {
                if(playing){
                  setPlaying(false)
                }else{
                  setPlaying(true)
                }
              }}>
                <PlayArrowRoundedIcon/>
              </button>
              <button className="local-btn-5 bg-neutral-700" onClick={() => {
                if(current_track < (playlist.length - 1)){
                  setCurrent_track(current_track+1)
                }
              }}>
                <SkipNextRoundedIcon/>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button className={"local-btn-6 border-[black!important] bg-neutral-700 local-volume-control "+(volume == 0 ? "text-red-600" : "text-white")}>
                <VolumeMuteRoundedIcon onClick={() => {
                  if(volume > 0){
                    setInitial_volume(volume)
                    setVolume(0)
                  }else{
                    setVolume(initial_volume)
                  }
                }}/>
                <span className={volumeRenderer(1, 2) + " " + (volume == 0 ? "bg-red-600" : "bg-white")} onClick={() => {
                  const low = 1
                  const high = 2
                  if(volume == low){
                    setVolume(high)
                  }else{
                    setVolume(low)
                  }
                }}></span>
                <span className={volumeRenderer(3, 4) + " " + (volume == 0 ? "bg-red-600" : "bg-white")} onClick={() => {
                  const low = 3
                  const high = 4
                  if(volume == low){
                    setVolume(high)
                  }else{
                    setVolume(low)
                  }
                }}></span>
                <span className={volumeRenderer(5, 6) + " " + (volume == 0 ? "bg-red-600" : "bg-white")} onClick={() => {
                  const low = 5
                  const high = 6
                  if(volume == low){
                    setVolume(high)
                  }else{
                    setVolume(low)
                  }
                }}></span>
                <span className={volumeRenderer(7, 8) + " " + (volume == 0 ? "bg-red-600" : "bg-white")} onClick={() => {
                  const low = 7
                  const high = 8
                  if(volume == low){
                    setVolume(high)
                  }else{
                    setVolume(low)
                  }
                }}></span>
                <span className={volumeRenderer(9, 10) + " " + (volume == 0 ? "bg-red-600" : "bg-white")} onClick={() => {
                  const low = 9
                  const high = 10
                  if(volume == low){
                    setVolume(high)
                  }else{
                    setVolume(low)
                  }
                }}></span>
              </button>
              <div className="flex gap-2 items-center justify-center">
                <button className="local-btn-6 bg-neutral-700">
                  <CloseFullscreenRoundedIcon/>
                </button>
                <div className="flex items-center justify-center local-btn-6 local-vote-control bg-neutral-700">
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
    results.push(<Track key={i}/>)
  }
  return results
}