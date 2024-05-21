import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CodeBlockPage.css';

function CodeBlockPage() {
    const { title } = useParams();
    console.log(title);
    const [code, setCode] = useState('');
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Fetch the role from the server
        fetch('http://localhost:5000/api/role')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched role:", data.role);
                setRole(data.role);
            })
            .catch(error => console.error('Error fetching role:', error));

        //fetch the code block content based on the title
        const codeBlocks = {
            "Async case": "async function example() { /* async code */ }",
            "Promise chaining": "Promise.resolve().then(() => {}).catch(() => {});",
            "Error handling": "try { /* code */ } catch (error) { /* handle error */ }",
            "Fetching data": "fetch('/api/data').then(response => response.json());"
        };

        setCode(codeBlocks[title]);

    }, [title]);

    return (
        <div className="code-block-page">
            <h1>{title}</h1>
            <p>Role: {role}</p> {/* Display the role */}
            <pre><code>{code}</code></pre>
        </div>
    );
}

export default CodeBlockPage;
