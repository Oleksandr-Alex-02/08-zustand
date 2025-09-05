"use client";

import css from './Modal.module.css';
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.code === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) }
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    }

    return createPortal(
        <>
            <div
                onClick={handleBackdropClick}
                className={css.backdrop}
                role="dialog"
                aria-modal="true"
            >
                <div className={css.modal}>
                    {children}
                </div>
            </div>
        </>,
        document.body
    )
}