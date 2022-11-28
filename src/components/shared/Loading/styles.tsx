import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Loader = styled(motion.div)`
  align-items: center;
  background: #18315B;
  bottom: 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;
