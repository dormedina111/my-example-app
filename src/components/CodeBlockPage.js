import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './CodeBlockPage.css';
import Highlight from 'react-highlight';
import 'highlight.js/styles/default.css';

const socket = io.connect("http://localhost:5000");

function CodeBlockPage() {
    const { title } = useParams();
    const [code, setCode] = useState('');
    const [role, setRole] = useState(null);

    useEffect(() => {
        socket.emit('joinRoom', title);

        // Event handler for role assignment
        socket.on('roleAssigned', (assignedRole) => {
            console.log(`Assigned role: ${assignedRole}`);
            setRole(assignedRole);
        });

        // Event handler for receiving code updates
        socket.on('updateCode', (newCode) => {
            setCode(newCode);
        });

        return () => {
            socket.off('roleAssigned');
            socket.off('updateCode');
            socket.emit('leaveRoom', title);
        };
    }, [title]);

    // Event handler for textarea value change
    const handleCodeChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        socket.emit('updateCode', newCode);
    };

    if (role === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="code-block-page">
            <h1>{title}</h1>
            <p>Role: {role}</p>
            {role === 'student' ? (
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    style={{ width: '100%', height: '400px' }}
                />
            ) : (
                <Highlight className="javascript">
                    {code}
                </Highlight>
            )}
        </div>
    );
}

export default CodeBlockPage;
