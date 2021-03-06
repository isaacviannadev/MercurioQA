import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import toast from 'react-hot-toast';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handlejoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      toast.error('Preencha com o códgo da sala', {
        style: {
          borderRadius: '999px',
          background: '#7bd134',
          color: '#fff',
        },
      });
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Esta sala nao existe', {
        style: {
          borderRadius: '999px',
          background: '#7bd134',
          color: '#fff',
        },
      });
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Esta sala foi encerrada pelo dono', {
        style: {
          borderRadius: '999px',
          background: '#7bd134',
          color: '#fff',
        },
      });
      return;
    }

    // if (roomRef.val().authorId === user?.id) {
    //   history.push(`admin/rooms/${roomCode}`);
    // } else {
    //   history.push(`/rooms/${roomCode}`);
    // }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id='pageAuth'>
      <aside>
        <img src={illustrationImg} alt='Ilustração' />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className='mainContent'>
          <img src={logoImg} alt='letmeask logo' />
          <button onClick={handleCreateRoom} className='createRoom'>
            <img src={googleIconImg} alt='google logo' />
            Crie sua sala com o Google
          </button>

          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handlejoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
