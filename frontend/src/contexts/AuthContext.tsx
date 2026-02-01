"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    email?: string;
    user_metadata?: {
        full_name?: string;
        avatar_url?: string;
    };
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking auth state for the design port
        // In a real scenario, this would check JWT or session
        const mockUser = {
            id: 'mock-uuid',
            email: 'user@example.com',
            user_metadata: {
                full_name: 'Guest Traveler'
            }
        };

        // Check localStorage for "mock_logged_in" to simulate login/logout
        const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('mock_logged_in') === 'true';

        if (isLoggedIn) {
            setUser(mockUser);
        }

        setLoading(false);
    }, []);

    const signOut = async () => {
        localStorage.removeItem('mock_logged_in');
        setUser(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
