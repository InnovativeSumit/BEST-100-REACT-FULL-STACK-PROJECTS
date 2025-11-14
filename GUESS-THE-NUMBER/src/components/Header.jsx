import React from 'react';

const Header = () => {
    return (
        <header className='text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'>
            <div className='title'>
                <h1 className='text-4xl font-bold mb-2'>Guess the Number</h1>
                <p className='text-lg opacity-90'>Can you guess the number between 1 and 25?</p>
            </div>
        </header>
    );
};

export default Header;

