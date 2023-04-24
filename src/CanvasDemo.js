import React, { useRef } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";

export default function CanvasDemo() {
    const videoRef = useRef(null);

    const handleStartStreaming = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error(error);
        }
    };
    function componentDidMount() {
        window.addEventListener('load', handleLoad());
    }
    function handleLoad() {
        handleStartStreaming();
    }
    componentDidMount();

    return (
        <React.Fragment>
            <Box width={'fit-content'}>
                <Card>
                    <CardContent>
                        <video hidden ref={videoRef} id='video_in' autoPlay > </video>
                        <canvas id='video_out' width={640} height={480} > </canvas>
                    </CardContent>
                </Card>
            </Box>


        </React.Fragment>

    )






}
