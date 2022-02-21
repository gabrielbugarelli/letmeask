import  illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

export const Home = () => {
	return (
		<div>
			<aside>
				<img src={illustrationImg} alt="Illustração simbolizando perguntas e respostas" />

				<strong> Crie salas de Q&A ao-vivo </strong>

				<p> Tire as dúvidas da sua audiência em tempo-real </p>
			</aside>

      <main>
        <div>
          <img src={logoImg} alt="letmeask" />

          <button>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>

          <div>
            ou entre na sala
          </div>

          <form>
            <input 
              type="text" 
              placeholder='Digite o código da sala'
            />

            <button type='submit'> Entrar na sala </button>
          </form>
        </div>
      </main>
		</div>
	)
}
