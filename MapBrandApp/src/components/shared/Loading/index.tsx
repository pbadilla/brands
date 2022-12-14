import { useState } from 'react';
import { motion } from 'framer-motion';

import * as SC from './styles';

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true)

    const loading = () => {
        setIsLoading(!isLoading)
    }
    return (
        <SC.Loader>
            {/* CLICK ME!!! */}
            <h2 onClick={loading}>Steven Creates</h2>
            {isLoading && (
                <>
                    <span>Loading....</span>
                    <br/>
                    <motion.div
                        animate={{
                            rotate: 360,
                            borderRadius: [ "50% 50%", "2% 50%"],
                            x: 75
                        }}
                        initial={{
                            x: -75
                        }}
                        transition={{
                            flip: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                        }}
                        style={{
                            height: "50px",
                            background: "#E81B63",
                            width: "50px",
                            borderRadius: "2% 50%",
                        }}
                    >
                    </motion.div>
                </>
            )}
        </SC.Loader>
    )
}

export default Loading