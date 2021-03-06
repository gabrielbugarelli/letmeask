
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import  illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.png';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { FormEvent, useState } from 'react';
import { database } from '../services/firebaseConnection';

export const Home = () => {
  const [ roomCode, setRoomCode ] = useState('');

  const navigate = useNavigate();

  const { user, signWithGoogle } = useAuth();

  /**
   * @author Gabriel Mendes
   * @descriptionLeva usuário para página de NewRoom.tsx
   */
  const handleCreateRoom = async () => {
    if(!user) {
      await signWithGoogle();
    }

    navigate('/rooms/new');
  }

  /**
   * @description o método valida se a sala existe, se existir, o usuário será redirecionado
   * para a sala de acordo com o código digitado. 
   */
  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exist.');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    navigate(`rooms/${roomCode}`);
  }

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />

				<strong> Crie salas de Q&A ao-vivo </strong>

				<p> Tire as dúvidas da sua audiência em tempo-real </p>
			</aside>

      <main>
        <div className='main-content'>
          <img src={logoImg} alt="letmeask" />

          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="Logo do google" />
            Crie a sua sala com o Google
          </button>

          <div className='separator'>
            ou entre na sala
          </div>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type='submit'> Entrar na sala </Button>
          </form>
        </div>
      </main>
		</div>
	)
}
