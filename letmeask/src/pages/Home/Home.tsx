import { useHistory } from 'react-router-dom'
import { Button } from '../../components/Button'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth';
import { FormEvent, useState } from 'react'

import '../../styles/auth.scss'

export function Home(){
    const history = useHistory()
    const { user, signInWithGoogle} = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom(){
        if (!user){
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if(roomCode.trim() === ''){
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Não existe esta sala');
            return;
        }
        history.push(`rooms/${roomCode}`);
    }
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustraçao de perguntas"/>
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Pergunta aí</p>
            </aside>
            <main>
                <div className = "main-content" >
                    <img src={logoImg} alt="Letmeask"/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onClick={handleJoinRoom}>
                        <input 
                            type = "text"
                            placeholder ="Digite o codigo da sala"
                            onChange = {event => setRoomCode(event.target.value)}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    
                    </form>
                </div>
            </main>
        </div>
    )
}