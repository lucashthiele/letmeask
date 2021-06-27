import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg'
import { useTheme } from '../hooks/useTheme';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss'
import { database } from '../services/firebase';
import { useEffect } from 'react';
import { SwitchButton } from '../components/SwitchButton';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { theme } = useTheme();

  const { questions, title } = useRoom(roomId);

  useEffect(() => {

    async function verifyUserAdmin() {
      const roomRef = await database.ref(`rooms/${roomId}`).get();

      if (!user) {
        history.push('/notfound');
      } else if (user?.id !== roomRef.val().authorId) {
        history.push('/notfound');
      }
    }

    verifyUserAdmin();
  }, [history, roomId, user])

  async function handleQuestionStatusChanged(questionId: string, action: string) {
    if (action === 'checkAnswered') {
      await database.ref(`rooms/${roomId}/question/${questionId}`).update({
        isHighlighted: false,
        isAnswered: true,
      });
    } else if (action === 'highlight') {
      await database.ref(`rooms/${roomId}/question/${questionId}`).update({
        isHighlighted: true,
      });
    } else if (action === 'delete') {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir a pergunta?');

      if (confirmDelete) {
        await database.ref(`rooms/${roomId}/question/${questionId}`).remove();
      }
    }
  }

  async function handleEndRoom(roomId: string) {
    const confirmEnding = window.confirm('Tem certeza que quer encerrar esta sala?');

    if (confirmEnding) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
    }

    history.push('/');
  }

  return (
    <div id="page-room" className={theme === 'dark' ? 'dark' : ''}>
      <header>
        <div className="content">
          <img src={theme === 'light' ? logoImg : logoDarkImg} alt="LetMeAsk" />
          <div>
            <SwitchButton />
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={() => handleEndRoom(roomId)}
            >
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleQuestionStatusChanged(question.id, 'checkAnswered')}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuestionStatusChanged(question.id, 'highlight')}
                    >
                      <img src={answerImg} alt="Destacar pergunta que ira ser respondida" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleQuestionStatusChanged(question.id, 'delete')}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>

      </main>
    </div>
  )
}