import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router';

import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';

type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const { questions, title } = useRoom(params.id)
    const history = useHistory();


    async function handleEndRoom() {
        await database.ref(`rooms/${params.id}`).update({
            endedAt: new Date(),
        })
        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {

        if (window.confirm('Tem certeza que você deseja excluir esta pergunta')) {
            await database.ref(`rooms/${params.id}/question/${questionId}`).remove()
        }
    }
    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${params.id}/question/${questionId}`).update({
            isHighlighted: true
        })

    }
    async function handleCheckQuestion(questionId: string) {
        await database.ref(`rooms/${params.id}/question/${questionId}`).update({
            isAnswered: true
        })
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {
                        questions.length > 0 &&
                        <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                                author={question.author}
                            >
                                {
                                    !question.isAnswered && (
                                        <>
                                            <button type="button"
                                                onClick={() => handleCheckQuestion(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>
                                            <button type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque para a pergunta" />
                                            </button>
                                        </>
                                    )
                                }
                                <button type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="deletar pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}