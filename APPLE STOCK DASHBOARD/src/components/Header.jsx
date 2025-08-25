import { useContext } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeContext from '../contexts/ThemeContext'

const Header = ({ name }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <motion.header 
      className="flex items-center justify-between p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className="p-3 bg-primary/10 rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TrendingUp className="h-8 w-8 text-primary" />
        </motion.div>
        <div>
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Stock Dashboard
          </motion.h1>
          {name && (
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {name}
            </motion.p>
          )}
        </div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={toggleTheme}
          className="relative overflow-hidden group"
        >
          <motion.div
            initial={false}
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </motion.div>
          <span className="ml-2 font-medium">
            {darkMode ? 'Light' : 'Dark'} Mode
          </span>
        </Button>
      </motion.div>
    </motion.header>
  )
}

export default Header

