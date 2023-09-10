import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'

export default function Track(
  {title = "", artist = "", points = 0, is_playing = false, onPlay = () => {}, onPause = () => {}}
  :{title?:string, artist?:string, points?:number, is_playing?:boolean, onPlay?:Function, onPause?:Function}
  ) {
    return (
        <div className="flex w-full h-[2.7rem] items-center local-track bg-neutral-900 hover:bg-neutral-700">
          <div className="flex items-center flex-[3] h-full">{title || "track name"} --- ({points})</div>
          <div className="flex items-center flex-[1] h-full">--:--</div>
          <div className="flex items-center flex-[4] h-full">{artist}</div>
          <button className="flex items-center h-full">
          {
              is_playing
              ? (<PauseRounded onClick={() => {onPause()}}/>)
              : (<PlayArrowRoundedIcon onClick={() => {onPlay()}}/>)
            }
          </button>
        </div>
    )
  }
  