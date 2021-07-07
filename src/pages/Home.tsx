import React from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
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
          <button>
            <img src={googleIconImg} alt='google logo' />
            Crie sua sala com o Google
          </button>

          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Digite o código da sala' />
            <button>Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
}
