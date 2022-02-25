import { FormEvent, useState }  from 'react';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import  illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.png';

import '../styles/auth.scss';
import { database } from '../services/firebaseConnection';

export const NewRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ newRoom, setNewRoom ] = useState('');

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    navigate(`/rooms/${firebaseRoom.key}`);
  }

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />

        <h1>Seja bem vindo, {user?.name}!</h1>

				<strong> Crie salas de Q&A ao-vivo </strong>

				<p> Tire as dúvidas da sua audiência em tempo-real </p>
			</aside>

      <main>
        <div className='main-content'>
          <img src={logoImg} alt="letmeask" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type='submit'> Criar sala </Button>
          </form>

          <p>
            Quer entrar em uma sala existente? 

            <Link to='/'>
              clique aqui
            </Link>
          </p>
        </div>
      </main>
		</div>
	)
}
