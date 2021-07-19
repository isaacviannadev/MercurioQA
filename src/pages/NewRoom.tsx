import { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    toast(
      (t) => (
        <span>
          Olá,
          <b> {user?.name}</b>
        </span>
      ),
      {
        icon: '👏',
        style: {
          borderRadius: '999px',
          background: '#A0EF3C',
          color: '#fff',
        },
      }
    );
  }, [user?.name]);

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === '') {
      toast((t) => <span> Sua sala precisa de um nome.</span>, {
        icon: '🤷‍♂️',
        style: {
          borderRadius: '999px',
          background: '#A0EF3C',
          color: '#fff',
        },
      });
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
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

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
