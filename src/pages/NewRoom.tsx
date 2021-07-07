import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';

export function NewRoom() {
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

          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <a href='#'>clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  );
}
