import { FormEvent, useState } from 'react';
import IllustrationSvg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export default function NewRoom() {
    const {user} = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim()===''){
            return;
        }
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId:user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`)
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
                        <h2>Criar uma nova sala</h2>
                        <form onSubmit={handleCreateRoom}>
                            <input type="text"
                                value={newRoom}
                                onChange={e => setNewRoom(e.target.value)}
                                placeholder="Nome da sala" />
                            <Button type="submit">Criar sala</Button>

                        </form>
                        <p>
                            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
                        </p>
                    </div>
                </main>
            </div>
        </>
    )
}