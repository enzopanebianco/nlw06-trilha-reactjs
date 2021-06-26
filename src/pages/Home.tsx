import IllustrationSvg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';
import GoogleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useHistory } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

export default function Home() {
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();
    const [roomCode,setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
          await  signInWithGoogle();
        }
        history.push('/rooms/new');
    }
    async function handleJoinRoom(event:FormEvent){
        event.preventDefault();
        if(roomCode.trim()===''){
            return;
        }
        
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Sala não existe');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Sala já encerrada')
        }

        history.push(`/rooms/${roomCode}`)
        
    }
    return (
        <>
            <div id="page-auth">
                <aside>
                    <img src={IllustrationSvg} alt="Illustração simbolizando perguntas e respostas" />
                    <strong>Crie salas de Q&amp;A ao-vivo</strong>
                    <p>tire as dúvidas da sua audiência em tempo-real</p>
                </aside>
                <main>
                    <div className="main-content">
                        <img src={LogoImg} alt="logo" />
                        <button onClick={handleCreateRoom} className="create-room">
                            <img src={GoogleIconImg} alt="Logo do google" />
                            Crie sua sala com google
                        </button>
                        <div className="separator">ou entre em uma sala</div>
                        <form onSubmit={handleJoinRoom}>
                            <input type="text"
                                onChange={e=>setRoomCode(e.target.value)}
                                value={roomCode}
                              placeholder="Digite o código da sala" />
                            <Button type="submit">Entrar na sala</Button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}