import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useNavigate, useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebaseConnection';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {

  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id ? params.id : '';

  const { questions, title } = useRoom(roomId); 

  const handleDeleteQuestion = async (questionId: string) => {
    const confirmRemoveQuestion = window.confirm('Tem certeza que deseja remover esta pergunta?');

    if( confirmRemoveQuestion ) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    navigate('/');
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    const confirmCheckQuestion = window.confirm('Tem certeza que deseja marcar essa questão como respondida?');

    if( confirmCheckQuestion ) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true
      })
    }
  }

  const handleHighlightQuestion = async (questionId: string) => {
    const confirmHighlightQuestion = window.confirm('Tem certeza que deseja destacar essa pergunta?')

    if( confirmHighlightQuestion ) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true
      })
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={roomId} />
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar
            </Button>
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  type='button'
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Responder pergunta" />
                </button>

                <button
                  type='button'
                  onClick={() => handleHighlightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Destacar pergunta" />
                </button>

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
