
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

import { firebase, auth, database} from '../services/firebaseConnection';

import  illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.png';

import '../styles/auth.scss'

export const Home = () => {

  const navigate = useNavigate();

  /**
   * @author Gabriel Mendes
   * @descriptionLeva usuário para página de NewRoom.tsx
   */
  const handleCreateRoom = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then( result => {
      console.log(result);
      navigate('/rooms/new');
    })

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

          <form>
            <input 
              type="text" 
              placeholder='Digite o código da sala'
            />

            <Button type='submit'> Entrar na sala </Button>
          </form>
        </div>
      </main>
		</div>
	)
}
