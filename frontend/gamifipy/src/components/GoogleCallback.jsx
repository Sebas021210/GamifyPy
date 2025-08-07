import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get("access_token");

        if (accessToken) {
            localStorage.setItem('token', accessToken);
            navigate('/levels', { replace: true });
        } else {
            navigate('/auth');
        }
    }, [navigate, searchParams]);

    return <p>Conectando con tu cuenta de Google...</p>;
};

export default GoogleCallback;
