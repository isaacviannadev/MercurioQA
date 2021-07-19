import toast from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg';

import '../styles/roomCode.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyCode() {
    navigator.clipboard.writeText(props.code);

    toast.success('Código Copiado', {
      style: {
        borderRadius: '999px',
        background: '#7bd134',
        color: '#fff',
      },
    });
  }

  return (
    <button className='roomCode' onClick={copyCode}>
      <div>
        <img src={copyImg} alt='Copiar código' />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
