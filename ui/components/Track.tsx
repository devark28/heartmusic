import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'

export default function Track() {
    return (
        <div className="flex w-full h-8 items-center local-track bg-neutral-900">
          <div className="flex items-center flex-[3] h-full">track name</div>
          <div className="flex items-center flex-[1] h-full">--:--</div>
          <div className="flex items-center flex-[4] h-full">artist</div>
          <button className="flex items-center h-full">
            <PlayArrowRoundedIcon/>
          </button>
        </div>
    )
  }
  