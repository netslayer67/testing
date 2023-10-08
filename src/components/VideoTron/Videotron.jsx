import { useState } from 'react';
import './Video.css';
import Video from '../../assets/Video.mp4';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import { Button } from '@material-tailwind/react';

export default function Videotron() {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="jumbotron m-3 relative">
            <video autoPlay muted={isMuted} loop src={Video} type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <div className="jumbotron-overlay">
                <div className="jumbotron-content absolute bottom-0 right-0" id='galeri'>
                    <Button
                        type="button"
                        id="myBtn"
                        onClick={toggleMute}
                        ripple={true}
                        className="inline-block rounded-full p-2 bg-transparent uppercase leading-normal text-white text-2xl shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-transparent hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-transparent focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                        {isMuted ? (
                            <FaVolumeXmark className=" volume-icon-transition" />
                        ) : (
                            <FaVolumeHigh className=" volume-icon-transition" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}