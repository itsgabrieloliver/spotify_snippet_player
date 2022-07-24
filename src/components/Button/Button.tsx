import React, { ReactNode } from 'react'

// Interfaces.
interface AnchorButtonProps {
    children: ReactNode
    href: string
}

interface ButtonProps {
    children: ReactNode
    onClick: any
}

// Anchor buttons.
// These require a href url string.
export const AnchorButtonGradientGB = ({ children, ...props }: AnchorButtonProps) => {
    return (
        <a {...props} className={'px-4 py-3 bg-gradient-to-br from-teal-300 to-green-400 rounded-full text-white text-sm tracking-wide font-bold uppercase hover:-translate-y-1 hover:origin-center hover:rotate-2'}>
            { children }
        </a>
    )
}

// Player control buttons.
// These require an onClick function prop.
export const PlayPauseControlButton = ({ children, ...props}: ButtonProps) => {
    return (
        <button {...props} className={'uppercase tracking-wide font-bold underline text-white text-xs'}>
            { children }
        </button>
    )
}

export const NextTrackControlButton = ({ children, ...props}: ButtonProps) => {
    return (
        <button {...props} className={'uppercase tracking-wide font-bold underline text-white text-xs'}>
            { children }
        </button>
    )
}