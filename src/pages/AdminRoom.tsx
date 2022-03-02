import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';
import { database } from '../services/firebaseConnection';

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id ? params.id : '';
  
  const { questions, title } = useRoom(roomId); 

  const handleDeleteQuestion = async (questionId: string) => {
    const removeQuestion = window.confirm('Tem certeza que deseja remover esta pergunta?');

    if( removeQuestion ) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map( question => {
            return (
              <Question
                key={question.id}
                author={question.author}
                content={question.content}
              >
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
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
