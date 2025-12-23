"use client"

import { motion, type Variants } from "motion/react"

function Loader() {
    const dotVariants: Variants = {
        jump: {
            y: -30, 
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <div className="loader-overlay">
            <motion.div
                animate="jump"
                transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
                className="dots-container"
            >
                <motion.div className="dot" variants={dotVariants} />
                <motion.div className="dot" variants={dotVariants} />
                <motion.div className="dot" variants={dotVariants} />
            </motion.div>
            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
            /* המעטפת שתופסת את כל המסך ויוצרת את הרקע הכהה */
            .loader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); /* שחור עם 50% שקיפות */
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999; /* מוודא שזה מעל הכל */
                backdrop-filter: blur(2px); /* אופציונלי: מטשטש מעט את הרקע */
            }

            .dots-container {
                display: flex;
                gap: 10px; /* רווח גדול יותר */
            }

            .dot {
                width: 20px;  /* חזרנו לגודל המקורי */
                height: 20px; /* חזרנו לגודל המקורי */
                border-radius: 50%;
                background-color: #1e0368ff;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default Loader