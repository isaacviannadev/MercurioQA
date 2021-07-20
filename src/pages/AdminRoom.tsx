import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import Swal from 'sweetalert2';

import QRCode from 'qrcode.react';

import '../styles/room.scss';
import toast from 'react-hot-toast';

type AdminRoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<AdminRoomParams>();

  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    Swal.fire({
      title: 'Excluir pergunta',
      text: 'Tem certeza que você deseja excluir esta pergunta?',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      backdrop: '#0d263dbc',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        toast.success('Pergunta excluída', {
          style: {
            borderRadius: '999px',
            background: '#A0EF3C',
            color: '#fff',
          },
        });
      }
    });
  }

  async function handleEndRoom() {
    Swal.fire({
      title: 'Encerrar sala?',
      text: 'Uma vez encerrada ela não pode ser reaberta, nem receber novas perguntas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      backdrop: '#0d263dbc',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        database.ref(`rooms/${roomId}`).update({
          endedAt: new Date(),
        });

        history.push('/');
      }
    });
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id='pageRoom'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask logo' />
          <div className=''>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main className='content'>
        <div className='roomTitle'>
          <div className='details'>
            <h1>{title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>

          <div className='cardRoomInfo'>
            <div className='infoRoom'>
              <span>
                Pessoas na sala: <strong>{'87'}</strong>
              </span>
              <span>
                Perguntas: <strong>{'267'}</strong>
              </span>
            </div>
            <div className='codeCard'>
              <span>Compatilhe</span>
              <QRCode
                value={`https://mercurioqea.web.app/rooms/${roomId}`}
                size={70}
                bgColor={'#fff'}
                fgColor={'#2d2e33'}
                level={'L'}
                includeMargin={false}
                renderAs={'svg'}
                imageSettings={{
                  src: '/favicon-32x32.png',
                  height: 24,
                  width: 24,
                  excavate: false,
                }}
              />
            </div>
          </div>
        </div>

        <div className='questionList'>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt='Pergunta respondida' />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt='Destacar pergunta' />
                    </button>
                  </>
                )}

                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>

                <div className='divider'></div>

                {!question.isAnswered && (
                  <button
                    className={`likeBtn likeBtn2 ${
                      question.likeId ? 'liked' : ''
                    }`}
                    type='button'
                    aria-label='Total de Likes'
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z'
                        stroke='#737380'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
