'use client'

/*********
 * ICONS *
 *********/
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded'
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
import { Fragment, useEffect, useRef, useState, ChangeEvent } from 'react';
import ReactPlayer from 'react-player';

export default function Home() {
  const [is_current_track_local, setIs_current_track_local] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(1);
  const [initial_volume, setInitial_volume] = useState<number>(volume);
  const [playing, setPlaying] = useState<boolean>(false)
  const [playlist, setPlaylist] = useState<Array<string>>([])
  const [current_track, setCurrent_track] = useState<number>(0)
  const [muted, setMuted] =  useState<boolean>(volume == 0)
  
  const [started, setStarted] =  useState<boolean>(false)
  const [ready, setReady] =  useState<boolean>(false)
  const [progress, setProgress] =  useState<number>(0)
  const [duration, setDuration] =  useState<number>(0)
  const [timeStamp, setTimeStamp] =  useState<Array<number>>([0, 0, 0])
  const [remTimeStamp, setRemTimeStamp] =  useState<Array<number>>([0, 0, 0])
  const [was_playing, set_was_playing] =  useState<boolean>(false)
  const video_player_ref = useRef<ReactPlayer | null>(null)

  useEffect(() => {
    setPlaylist([
      "/audios/dubstep_violin_lindsey_stirling_crystallize_mp3_53985.mp3",
      "/audios/eva_simons_ft._konshens_policeman_lyric_video_mp3_47931.mp3",
      "/audios/pitbull_with_enrique_iglesias_messin_around_official_video_mp3_54201.mp3",
      "/audios/war classic (3).mp3",
    ])
  }, [])

  useEffect(() => {
    if(volume == 0){
      setMuted(true)
    }else{
      setMuted(false)
    }
  }, [volume])

  useEffect(() => {
    if((progress == 100) && (current_track < (playlist.length - 1))){
      setCurrent_track(current_track+1)
    }
  }, [progress])
  

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
          {/*  w-[auto!important] */}
          <ReactPlayer
          className="flex relative w-[30rem!important] h-[auto!important]"
          ref={video_player_ref}
          onReady={() => {
            // setPreview(true)
            console.log("ready");
          }}
          pip={false}
          onDuration={(dur)=>{
            console.log("Buffer end -- " + dur);
            setDuration(dur)
          }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: true,
                preload: "none",
              },
            },
          }}
          onStart={()=>{
            // setDuration(video_player_ref.current.getDuration())
            // video_player_ref.current.seekTo(time_stamp, "seconds")

            if(!started && (duration > 0) && !ready){
              setPlaying(false)
              setMuted(false)
              video_player_ref?.current?.seekTo(0, "seconds")
              setProgress(0)
              setReady(true)
            }else{
              setStarted(true)
            }
          }}
          onEnd={()=>{
            console.log("end");
          }}
          // onPlay={()=>{console.log("playing")}}
          // onPause={()=>console.log("pausing")}
          onProgress={(state)=>{
            // (state.played * 100).toFixed(5)
            setProgress(parseFloat((state.played * 100).toFixed(5)))
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
            const rem = duration - time
            const rem_hours = Math.trunc(rem / 3600)
            const rem_minutes = Math.trunc(((rem / 3600) - rem_hours) * 60)
            const rem_seconds = Math.trunc(((((rem / 3600) - rem_hours) * 60) - rem_minutes) * 60)
            setRemTimeStamp([rem_hours, rem_minutes, rem_seconds])
          }}
          onBuffer={()=>{
            console.log("buffering");
          }}
          onBufferEnd={()=>{
            console.log("end buffering");
          }}
          wrapper={Fragment}
          onClick={()=>{
              // set_is_playing(!is_playing)
          }}
          url={playlist[current_track]}
          volume={volume/10}
          playing={playing}
          autoPlay
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
              onChange={(e: Event, value: number | number[]) => {
                const val = typeof value === "number" ? value : value[0]
                video_player_ref?.current?.seekTo((val as number) * duration / 100, "seconds")
                setProgress(val as number)
                console.log(progress, val as number , (val as number) * duration / 100);
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
              <span>
                {timeStamp[0] > 0 ? `${timeStamp[0] < 10 ? `0${timeStamp[0]}` : timeStamp[0]}:` : ""}
                {timeStamp[1] < 10 ? `0${timeStamp[1]}` : timeStamp[1]}:{timeStamp[2] < 10 ? `0${timeStamp[2]}` : timeStamp[2]}
              </span>
              <span>
                {remTimeStamp[0] > 0 ? `${remTimeStamp[0] < 10 ? `0${remTimeStamp[0]}` : remTimeStamp[0]}:` : ""}
                {remTimeStamp[1] < 10 ? `0${remTimeStamp[1]}` : remTimeStamp[1]}:{remTimeStamp[2] < 10 ? `0${remTimeStamp[2]}` : remTimeStamp[2]}
              </span>
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
                {
                  playing
                  ? (<PauseRounded/>)
                  : (<PlayArrowRoundedIcon/>)
                }
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
                {renderVolumeBars(volumeRenderer, volume, setVolume)}
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

function renderVolumeBars(volumeRenderer:Function, volume:number, setVolume:Function){
  let results = []
  for (let i = 1; i < 20; i+=2) {
    // const element = data[i];
    const low = i
    const high = i+1
    results.push(
      <span className={volumeRenderer(low, high) + " " + (volume == 0 ? "bg-red-600" : "bg-white")} onClick={() => {
        if(volume == low){
          setVolume(high)
        }else{
          setVolume(low)
        }
      }}></span>
    )
  }
  return results
}