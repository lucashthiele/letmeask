import { useParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

type RoomParams = {
  id: string;
}

export function RoomCode(props: RoomCodeProps){
  const params = useParams<RoomParams>();
  const { theme } = useTheme();

  function copyRoomCodeToClipboard(){
      navigator.clipboard.writeText(props.code);
  }

  return(
    <button className={`room-code ${theme === 'dark' ? 'dark' : ''}`} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="" />
      </div>
      <span>Sala: {params.id}</span>
    </button>
  )
}