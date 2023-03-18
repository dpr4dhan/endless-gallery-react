import {AnimatePresence, motion} from 'framer-motion';

const RouteWrapper = ({ children }) => (
    <AnimatePresence mode='wait' initial={false}>
    <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0}}
        exit={{ scale: 0}}
        key={location.pathname}
    >
        {children}
    </motion.div>
    </AnimatePresence>
);
export default RouteWrapper;